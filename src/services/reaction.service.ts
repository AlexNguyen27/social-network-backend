import { Op } from 'sequelize';
import Reaction from '../models/reaction.model';
import { ExistsError } from '../components/errors';
import ReactionType from '../models/reactionType.model';

class ReactionService {
  static async createReaction({ userId, reactionTypeId, postId }: { userId: string; reactionTypeId: string; postId: string }) {
    const changeReactionType: any = await this.findReactionByUserIdPostId({ userId, postId });

    // GET REACTION TYPE
    const reactionLike: any = await ReactionType.findOne({
      where: { name: 'like' },
      attributes: ['id']
    });

    const { id: reactionLikeId } = reactionLike;
    console.log(reactionLikeId);

    if (changeReactionType && changeReactionType.reactionTypeId === reactionLikeId) {
      return await this.deleteReaction({ userId, postId, reactionTypeId: reactionLikeId });
    }

    if (!changeReactionType) {
      const newReaction = await Reaction.create({ userId, postId, reactionTypeId: reactionLikeId });
      if (newReaction) return { status: 200, message: 'Create successfully' };
    }

    return await this.updateReactionType({ userId, reactionTypeId: reactionLikeId, postId });
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
