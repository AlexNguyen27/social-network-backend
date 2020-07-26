import joi from 'joi';

import { middleware, schemaValidation, authorize } from '../components';
import CatService from '../services/cat.service';
import { CatCreationInput } from '../types/cat.type';
import { ROLE } from '../components/constants';

const resolver = {
  Query: {
    cats: () => CatService.getCats(),
  },
  Mutation: {
    createCat: middleware(
      authorize(ROLE.admin),
      schemaValidation({
        color: joi.string().valid('black', 'white'),
      }),
      (_: any, args: CatCreationInput) => CatService.createCat(args),
    ),
  },
};

export default resolver;
