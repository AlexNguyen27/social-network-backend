import ReactionType from '../models/reactionType.model';
import { ExistsError } from '../components/errors';

class ReactionTypeService {

  static createReactionType({ name }: { name: string }) {
    return ReactionType.create({
      name
    });
  }

  static findReactionTypeById(id: string) {
    return ReactionType.findOne({ where: { id } }).then((ReactionType) => {
      if (!ReactionType) throw new ExistsError('ReactionType not found');
      return ReactionType;
    });
  }
  static async updateReactionType({ id, name }: { id: string, name: string }) {
    await this.findReactionTypeById(id);
    await ReactionType.update({ name }, { where: { id } });

    const currentReactionType = await this.findReactionTypeById(id);
    return currentReactionType;
  }

  static async deleteReactionType({ id }: { id: string }) {
    const currentReactionType = await ReactionType.findOne({ where: { id } });
    if (!currentReactionType) {
      throw new ExistsError('ReactionType not found');
    }
    try {
      await ReactionType.destroy({ where: { id } });
      return {
        status: 200,
        message: 'Delete successfully',
      };
    } catch (err) {
      throw err;
    }
  }
}

export default ReactionTypeService;
