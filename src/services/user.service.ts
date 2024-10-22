import { AuthenticationError } from 'apollo-server';
import User from '../models/user.model';
import Post from '../models/post.model';
import { ExistsError, BusinessError } from '../components/errors';
import Comment from '../models/comment.model';
import Reaction from '../models/reaction.model';
import Follower from '../models/follower.model';
import ReactionType from '../models/reactionType.model';
import { truncateMultilineString } from '../utils/formatString';
import { Op } from 'sequelize';
import { POST_STATUS, ROLE } from '../components/constants';
import bcrypt from 'bcrypt';

class UserService {
  static async getUsers(user: any) {
    let wherePost;
    let whereUser;

    if (user.role === ROLE.user) {
      wherePost = {
        status: POST_STATUS.public
      }
    }

    // GET REACTION TYPE
    const reactionLike: any = await ReactionType.findOne({
      where: { name: 'like' },
      attributes: ['id']
    });

    const { id: reactionLikeId } = reactionLike;

    const users = await User.findAll({
      where: whereUser,
      include: [
        {
          model: Post,
          as: 'posts',
          where: wherePost,
          required: false,
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
            },
            {
              model: User,
              as: 'user',
            },
          ],
        },
      ],
      order: [['createdAt', 'DESC'], ['posts', 'createdAt', 'DESC']],
    });

    return users;
  }

  static async getUserProfile(data: any, user: any) {
    const reactionLike: any = await ReactionType.findOne({ where: { name: "like" }, attributes: ['id'] });
    const { id: reactionLikeId } = reactionLike.dataValues;

    let wherePost: any;
    // GET FRIEND_PROFILE
    if (user.userId !== data.userId) {
      wherePost = {
        status: POST_STATUS.public
      }
    }

    const userProfile: any = await User.findOne({
      where: { id: data.userId },
      include: [
        {
          model: Post,
          as: 'posts',
          where: wherePost,
          required: false,
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
            },
            {
              model: User,
              as: 'user',
            },
          ],
        },
        {
          model: Follower,
          as: 'followed',
          required: false
        }
      ],
      order: [['posts', 'createdAt', 'DESC']],
    });

    let fromatedUserPosts = userProfile.posts;
    fromatedUserPosts = fromatedUserPosts.map((item: any) => ({
      ...item.dataValues,
      description: truncateMultilineString(item.description, 350)
    }));

    userProfile.posts = fromatedUserPosts;

    const userFavoritePosts = await Post.findAll({
      where: { status: 'public' },
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
        },
        {
          model: User,
          as: 'user',
        },
        {
          model: Comment,
          as: 'comments',
          required: false
        },
      ]
    })

    let formatedPost: any = userFavoritePosts;
    formatedPost = formatedPost.map((item: any) => ({
      ...item.dataValues,
      description: truncateMultilineString(item.description, 350)
    }));
    userProfile.userFavoritePosts = formatedPost;

    // FOLLOW BY HOW MANY USERS
    const totalFollowers = await Follower.findAndCountAll({
      where: { toUserId: data.userId }
    })
    userProfile.totalFollowers = totalFollowers.count;
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

  static async changePassword(data: any, user: any) {
    const { userId, currentPassword, newPassword, confirmPassword } = data;

    // ADMIN CAN UPDATE PASSWORD USER
    if (userId && user.role === ROLE.user) {
      throw new AuthenticationError("Your role is not allowed!");
    }

    // ADMIN => USERID OR TOKEN ID
    // USER => TOKEN ID
    const id = user.role === ROLE.admin ? userId || user.id : user.id;

    const userData: any = await this.findUserById(id);

    const match = await bcrypt.compare(currentPassword, userData.password);
    if (!match) {
      throw new AuthenticationError('Current password is incorrect!');
    }

    if (newPassword.trim().length < 6 || newPassword.trim().length > 42) {
      throw new BusinessError('Password must be more than 6 and 42 characters');
    }
    if (newPassword !== confirmPassword) {
      throw new BusinessError("Confirm password did not match!");
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    // ALREADY CATCH ERROR AT MODEL WHEN PASSWORD TO SHORT
    await User.update({ password: hashPassword }, { where: { id } });
    return {
      status: 200,
      message: 'Change password successfully',
    };
  }
}

export default UserService;
