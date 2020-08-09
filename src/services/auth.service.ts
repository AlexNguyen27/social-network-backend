import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';

import config from '../components/config';
import { AuthenticationError, ExistsError } from '../components/errors';
import { LoginInput, UserCreationInput } from '../types/user.type';

class AuthService {
  static async login(data: LoginInput) {
    const { username, password } = data;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new AuthenticationError('Username or password incorrect!');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AuthenticationError('Username or password is incorrect!');
    }

    const { id, role } = user;
    const { secretKey } = config.jwt;
    const payload = {
      id,
      userId: user.id,
      role,
    };

    // todo : add expired token
    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });
    return {
      token,
      ...user.toJSON(),
    };
  }

  static async register(data: UserCreationInput) {
    const { password, ...userData } = data;

    if (password.trim().length < 6 || password.trim().length > 42) {
      throw new AuthenticationError('Password must be more than 6 and 42 characters');
    }

    // try {
    //   const exitUser = await User.findOne({ where: { username: userData.username } });

    //   if (exitUser) {
    //     throw new ExistsError('Username already exits');
    //   }
    // } catch (err) {
    //   throw err;
    // }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ password: hashPassword, ...userData });

    return {
      ...newUser.toJSON(),
    };
  }
}

export default AuthService;
