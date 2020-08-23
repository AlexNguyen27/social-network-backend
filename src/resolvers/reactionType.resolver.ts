import joi from 'joi';
import ReactionType from '../services/reactionType.service';
import { middleware, tokenValidation, schemaValidation } from '../components';
import { ROLE } from '../components/constants';

const resolver = {
  Query: {
    getReactionTypes: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      (_: any, args: any) => ReactionType.getReactionTypes(),
    ),
  },
  Mutation: {
    createReactionType: middleware(
      tokenValidation(ROLE.admin),
      schemaValidation({
        name: joi.string(),
      }),
      (_: any, args: { name: string }) => ReactionType.createReactionType(args),
    ),

    updateReactionType: middleware(
      tokenValidation(ROLE.admin),
      (_: any, args: { id: string; name: string }) => ReactionType.updateReactionType(args),
    ),

    deleteReactionType: middleware(
      tokenValidation(ROLE.admin),
      (_: any, args: { id: string }) => ReactionType.deleteReactionType(args),
    ),
  },
};

export default resolver;
