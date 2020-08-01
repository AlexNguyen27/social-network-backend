import joi from 'joi';
import CategoryService from '../services/category.service';
import { middleware, tokenValidation, schemaValidation } from '../components';
import { ROLE, POST_STATUS } from '../components/constants';

const resolver = {
  Query: {
    getCategories: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      (_: any, _args: any, { user }: any) => CategoryService.getCategories(user),
    )
  },
  Mutation: {
    createCategory: middleware(
      tokenValidation(ROLE.admin),
      schemaValidation({
        name: joi.string(),
        status: joi.string().valid(Object.values(POST_STATUS))
      }),
      (_: any, args: { name: string; status: string; }) => CategoryService.createCategory(args),
    ),

    updateCategory: middleware(
      tokenValidation(ROLE.admin),
      (_: any, args: { id: string; name: string; status: string; } ) => CategoryService.updateCategory(args),
    ),

    deleteCategory: middleware(
      tokenValidation(ROLE.admin),
      (_: any, args: { id: string } ) => CategoryService.deleteCategory(args),
    )
  },
};

export default resolver;
