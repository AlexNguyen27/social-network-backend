import { Op } from 'sequelize';
import Reaction from '../models/reaction.model';
import { ExistsError } from '../components/errors';

class ReactionService {
  static async createReaction({ userId, reactionTypeId, postId }: { userId: string; reactionTypeId: string; postId: string }) {
    const changeReactionType: any = await this.findReactionByUserIdPostId({ userId, postId });
    if (changeReactionType && changeReactionType.reactionTypeId === reactionTypeId) {
      return await this.deleteReaction({ userId, postId, reactionTypeId });
    }

    if (!changeReactionType) {
      const newReaction = await Reaction.create({ userId, postId, reactionTypeId });
      if (newReaction) return { status: 200, message: 'Create successfully' };
    }

    return await this.updateReactionType({ userId, reactionTypeId, postId });
  }

  static findReactionByUserIdPostId({ userId, postId }: { userId: string; postId: string }) {
    return Reaction.findOne(
      {
        where:
        {
          [Op.and]: [
            { userId },
            { postId },
          ],
        },
      }
    ).then((reaction) => {
      if (!reaction) return null;
      return { ...reaction.toJSON() };
    });
  }

  // NOT USER YET
  // static findReactionByUserIdPostIdReactionTypeId({ userId, reactionTypeId, postId }: { userId: string, reactionTypeId: string, postId: string }) {
  //   return Reaction.findOne(
  //     {
  //       where:
  //       {
  //         [Op.and]: [
  //           { userId },
  //           { postId },
  //           { reactionTypeId }
  //         ]
  //       }
  //     }).then((reaction) => {
  //       console.log(reaction);
  //       if (!reaction) return;
  //       return { ...reaction.toJSON() };
  //     });
  // }

  static async updateReactionType({ userId, reactionTypeId, postId }: { userId: string; reactionTypeId: string; postId: string }) {
    try {
      await Reaction.update({ reactionTypeId }, {
        where:
        {
          [Op.and]: [
            { userId },
            { postId },
          ],
        },
      });

      return { status: 200, message: 'Update successfully' };
    } catch (err) {
      throw err;
    }
  }

  static async deleteReaction({ userId, reactionTypeId, postId }: { userId: string; reactionTypeId: string; postId: string }) {
    try {
      await Reaction.destroy({
        where:
        {
          [Op.and]: [
            { userId },
            { postId },
            { reactionTypeId },
          ],
        },
      });
      return {
        status: 200,
        message: 'Delete successfully',
      };
    } catch (err) {
      throw err;
    }
  }
}

export default ReactionService;
