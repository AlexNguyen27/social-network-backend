import { Op } from 'sequelize';
import { ExistsError } from '../components/errors';
import Follower from '../models/follower.model';
import UserService from './user.service';

class FollowerService {
  static async createFollower({ toUserId }: { toUserId: string }, user: any) {
    const exitsFollower: any = await this.findFollower({ toUserId, fromUserId: user.userId });
    if (!exitsFollower) {
      try {
        await Follower.create({ toUserId, fromUserId: user.userId });
        return { status: 200, message: 'Create follower successfully' };
      } catch (err) {
        throw err;
      }
    }

    return await this.deleteFollower({ toUserId }, user);
  }

  static findFollower({ toUserId, fromUserId }: { toUserId: string; fromUserId: string },) {
    return Follower.findOne(
      {
        where: {
          [Op.and]: [
            { toUserId },
            { fromUserId },
          ],
        },
      }
    ).then((follower) => {
      if (!follower) return null;
      return { ...follower.toJSON() };
    });
  }

  static async deleteFollower({ toUserId }: { toUserId: string }, user: any) {
    const { userId } = user;
    const currentFollower: any = await UserService.findUserById(toUserId);
    if (!currentFollower) {
      throw new ExistsError('Follower not found');
    }
    try {
      await Follower.destroy(
        {
          where: {
            [Op.and]: [
              { toUserId },
              { fromUserId: userId },
            ],
          },
        }
      );
      return {
        status: 200,
        message: 'Unfollow successfully',
      };
    } catch (err) {
      throw err;
    }
  }
}

export default FollowerService;
