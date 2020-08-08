import joi from 'joi';
import { middleware, tokenValidation, schemaValidation } from '../components';
import { ROLE } from '../components/constants';
import ReactionService from '../services/reaction.service';

// TODO: SHOULD HAVE POST FIRST
const resolver = {
  Mutation: {
    createReaction: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      schemaValidation({
        userId: joi.string().uuid(),
        postId: joi.string().uuid(),
        reactionTypeId: joi.string().uuid(),
      }),
      (_: any, args: { userId: string; reactionTypeId: string; postId: string }) => ReactionService.createReaction(args),
    ),
  },
};

export default resolver;
