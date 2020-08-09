import { AuthenticationError } from 'apollo-server';
import User from '../models/user.model';
import Post from '../models/post.model';
import { ExistsError } from '../components/errors';
import Comment from '../models/comment.model';

class UserService {
  static getUsers() {
    return User.findAll({
      include: [
        {
          model: Post,
          as: 'posts',
          include: [
            {
              model: Comment,
              as: 'comments',
            },
          ],
        },
      ],
    });
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
