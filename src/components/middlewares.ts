import { flow } from 'lodash';
import joi, { ValidationResult } from 'joi';

import { SchemaValidationError } from './errors';

export const middleware = (...parameters: any[]) => (root?: any, args?: any, context?: any, info?: any) => {
  const resolver = parameters[parameters.length - 1];
  flow([...parameters.slice(0, parameters.length - 1)])(root, args, context, info);
  return resolver(root, args, context, info);
};

// validate token
// export const tokenValidation = (...allowed) => (...rest) => {
//   const context = rest[2];
//   const { token } = context;
//   if (!token) {
//     throw new AuthenticationError('Không có token được cung cấp');
//   }
//   const { secretKey } = config.jwt;
//   jwt.verify(token, secretKey, (err, payload) => {
//     if (err) {
//       throw new AuthenticationError('Token không hợp lệ');
//     }
//     if (allowed.indexOf(payload.role) > -1) {
//       // eslint-disable-next-line no-param-reassign
//       rest[2].user = payload;
//       return rest;
//     }
//     throw new AuthorizationError('Không có quyền truy cập tài nguyên');
//   });
// };

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
    throw new SchemaValidationError(validation.error);
  }
  return rest;
};
