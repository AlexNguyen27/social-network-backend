import Reaction from '../models/reaction.model';
import { ExistsError } from '../components/errors';

class ReactionService {

  static createReaction({ userId, reactionTypeId, postId}: { userId: string, reactionTypeId: string, postId: string}) {
    return Reaction.create({
      userId,
      postId,
      reactionTypeId
    });
  }

  static findReactionById(id: string) {
    return Reaction.findOne({ where: { id } }).then((reaction) => {
      if (!reaction) throw new ExistsError('Reaction not found');
      return reaction;
    });
  }
  static async updateReaction({ id, name }: { id: string, name: string }) {
    await this.findReactionById(id);
    await Reaction.update({ name }, { where: { id } });

    const currentReaction = await this.findReactionById(id);
    return currentReaction;
  }

  static async deleteReaction({ id }: { id: string }) {
    const currentReaction = await Reaction.findOne({ where: { id } });
    if (!currentReaction) {
      throw new ExistsError('Reaction not found');
    }
    try {
      await Reaction.destroy({ where: { id } });
      return {
        status: 200,
        message: 'Success',
      };
    } catch (err) {
      throw err;
    }
  }
}

export default ReactionService;
