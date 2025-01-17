import { flow } from 'lodash';
import joi, { ValidationResult } from 'joi';
import jwt from 'jsonwebtoken';
import config from './config';

import { SchemaValidationError, AuthenticationError, AuthorizationError } from './errors';

export const middleware = (...parameters: any[]) => (root?: any, args?: any, context?: any, info?: any) => {
  const resolver = parameters[parameters.length - 1];
  flow([...parameters.slice(0, parameters.length - 1)])(root, args, context, info);
  return resolver(root, args, context, info);
};

// validate token
export const tokenValidation = (...allowed: any[]) => (...rest: any[]) => {
  const context = rest[2];
  // console.log('context0-----------------', context);
  const { token } = context;
  if (!token) {
    throw new AuthenticationError('No token provided');
  }
  const { secretKey } = config.jwt;
  jwt.verify(token, secretKey, (err: any, payload: any) => {
    if (err) {
      throw new AuthenticationError('Invalid access token');
    }
    if (allowed.indexOf(payload.role) > -1) {
      console.log(payload, 'payload-------------------');
      // eslint-disable-next-line no-param-reassign
      rest[2].user = payload;
      return rest;
    }
    throw new AuthorizationError('Your role is not allowed');
  });
};

export const schemaValidation = (schema: any = {}) => (...rest: any[]) => {
  const root = rest[0];
  const args = rest[1];
  const value = {
    ...root,
    ...args,
  };
  const validateOptions = { allowUnknown: true, abortEarly: false };
  const validation: ValidationResult<any> = joi.validate(value, schema, validateOptions);
  if (validation.error) {
    console.error(validation.error);
    throw new SchemaValidationError(validation.error);
  }
  return rest;
};

// export const authorize = (...allowed: string[]) => {
//   console.log('here---------------', allowed);
//   const isAllowed = (role: string) => allowed.indexOf(role) > -1;
//   // eslint-disable-next-line complexity
//   return (req: any, res: Response, next: NextFunction) => {
//     const token = req.body.token || req.query.token || req.headers['access-token'];
//     if (!token) {
//       throw new AuthenticationError('No token provided');
//     }
//     const { secretKey } = config.jwt;
//     try {
//       const decoded: any = jwt.verify(token, secretKey);
//       if (decoded && isAllowed(decoded.role)) {
//         res.locals.user = decoded;
//         next();
//       } else {
//         throw new AuthorizationError('Your role is not allowed');
//       }
//     } catch (err) {
//       throw new AuthenticationError('Invalid access token');
//     }
//   };
// };
