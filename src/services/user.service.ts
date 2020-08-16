import { AuthenticationError } from 'apollo-server';
import User from '../models/user.model';
import Post from '../models/post.model';
import { ExistsError } from '../components/errors';
import Comment from '../models/comment.model';
import Reaction from '../models/reaction.model';
import Follower from '../models/follower.model';
import ReactionType from '../models/reactionType.model';
import { Op } from 'sequelize';

class UserService {
  static async getUsers() {
    const users = await User.findAll({
      include: [
        {
          model: Post,
          as: 'posts',
          include: [
            {
              model: Comment,
              as: 'comments',
            },
            {
              model: Reaction,
              as: 'reactions',
              where: { reactionTypeId: '9d31b9c1-e375-4dc5-9335-0c8879695163' }
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC'], ['posts', 'createdAt', 'DESC']],
    });

    console.log(users)
    return users;
  }

  static async getUserProfile(data: any, user: any) {
    console.log(data)

    const reactionLike: any = await ReactionType.findOne({ where: { name: "like" }, attributes: ['id'] });
    const { id: reactionLikeId } = reactionLike.dataValues;
    // console.log(reactionLike.dataValues.id);

    const userProfile: any = await User.findOne({
      where: { id: data.userId },
      include: [
        {
          model: Post,
          as: 'posts',
          include: [
            {
              model: Comment,
              as: 'comments',
              required: false
            },
            {
              model: Reaction,
              as: 'reactions',
              required: false,
              where: { reactionTypeId: reactionLikeId }
            }
          ],
        },
        {
          model: Follower,
          as: 'followed',
        }
      ],
      order: [['posts', 'createdAt', 'DESC']],
    });

    // todo: fix status to public
    const userFavoritePosts = await Post.findAll({
      include: [
        {
          model: Reaction,
          as: 'reactions',
          where: {
            [Op.and]: [
              { reactionTypeId: reactionLikeId },
              { userId: data.userId }
            ]
          }
        }
      ]
    })

    userProfile.userFavoritePosts = userFavoritePosts;
    return userProfile;
  }

  static async findUserById(id: string) {
    return User.findOne({ where: { id } }).then((user) => {
      if (!user) throw new ExistsError('User not found');
      return { ...user.toJSON() };
    });
  }

  static async findUserByUsername(username: string) {
    return User.findOne({ where: { username } }).then((user) => {
      if (!user) throw new ExistsError('User not found');
      return user;
    });
  }

  static async updateUser(input: any, user: any) {
    let data = input.info;
    // IF HAS DATA ID THEN UPDATE USER ID
    // ELSE UPDATE TOKEN USER ID
    // TODO: only admin can edit role
    const userId = data.id || user.id;

    if (data.role && user.role === 'user') {
      throw new AuthenticationError('Your role is not allowed');
    }

    const userData: any = await this.findUserById(userId);
    if (userData.username === input.username) {
      delete data.username;
    }
    const res = await User.update(data, { where: { id: userId }, returning: true });
    console.log('res---------------------', res[1]);
    const currentUser = await this.findUserById(userId);
    return currentUser;
  }

  static async deleteUser({ id }: { id: string }) {
    const currentUser = await User.findOne({ where: { id } });
    if (!currentUser) {
      throw new ExistsError('User not found');
    }
    try {
      await User.destroy({ where: { id } });
      return {
        status: 200,
        message: 'Delete successfully',
      };
    } catch (err) {
      throw err;
    }
  }
}

export default UserService;
