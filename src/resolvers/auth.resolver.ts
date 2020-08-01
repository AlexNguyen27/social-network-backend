import joi, { any } from 'joi';

import AuthService from '../services/auth.service';
import { LoginInput, UserCreationInput } from '../types/user.type';

const resolver = {
  Query: {
    login: (_: any, args: LoginInput) => AuthService.login(args),
  },
  Mutation: {
    register: (_: any, args: UserCreationInput) => AuthService.register(args),
  },
};

export default resolver;
