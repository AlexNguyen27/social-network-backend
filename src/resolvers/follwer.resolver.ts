import joi from 'joi';
import { middleware, tokenValidation, schemaValidation } from '../components';
import { ROLE } from '../components/constants';
import FollowerService from '../services/follwer.service';

// TODO: SHOULD HAVE POST FIRST
const resolver = {
  Mutation: {
    createFollower: middleware(
      tokenValidation(ROLE.user),
      schemaValidation({
        toUserId: joi.string().uuid(),
      }),
      (_: any, args: any, { user }: any) => FollowerService.createFollower(args, user),
    ),

    deleteFollower: middleware(
      tokenValidation(ROLE.user),
      schemaValidation({
        toUserId: joi.string().uuid(),
      }),
      (_: any, args: any, { user }: any) => FollowerService.deleteFollower(args, user),
    ),
  },
};

export default resolver;
