import joi from 'joi';

import { UpdateUserInput } from 'src/types/user.type';
import { middleware, tokenValidation } from '../components';
import UserService from '../services/user.service';
import { ROLE } from '../components/constants';

const resolver = {
  Query: {
    getUsers: middleware(
      tokenValidation(ROLE.admin),
      () => UserService.getUsers()
    ),
  },
  Mutation: {
    updateUser: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      (_: any, args: any, { user }: any) => UserService.updateUser(args, user),
    ),
    deleteUser: middleware(
      tokenValidation(ROLE.admin),
      (_: any, args: any) => UserService.deleteUser(args),
    ),
  },
};

export default resolver;
