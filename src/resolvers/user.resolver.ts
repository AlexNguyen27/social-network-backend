import joi from 'joi';
import { middleware, tokenValidation } from '../components';
import UserService from '../services/user.service';
import { ROLE } from '../components/constants';

const resolver = {
  Query: {
    getUsers: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      (_: any, args: any, { user }: any) => UserService.getUsers(user)
    ),
    getUserProfile: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      (_: any, args: any, { user }: any) => UserService.getUserProfile(args, user)
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
    changePassword: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      (_: any, args: any, { user }: any) => UserService.changePassword(args, user),
    )
  },
};

export default resolver;
