import joi from 'joi';
import PostService from '../services/post.service';
import { middleware, tokenValidation, schemaValidation } from '../components';
import { ROLE, POST_STATUS } from '../components/constants';

const resolver = {
  Query: {
    getPosts: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      (_: any, args: any, { user }: any) => PostService.getPosts(args, user),
    ),
    getPostById: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      (_: any, args: { id: string }) => PostService.findPostById(args),
    ),
  },
  Mutation: {
    createPost: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      schemaValidation({
        title: joi.string(),
        description: joi.string(),
        imageUrl: joi.string(),
        categoryId: joi.string().uuid(),
        userId: joi.string().uuid(),
        status: joi.string().valid(Object.values(POST_STATUS)),
      }),
      (_: any, args: any) => PostService.createPost(args),
    ),

    updatePost: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      schemaValidation({
        id: joi.string().uuid(),
        title: joi.string(),
        description: joi.string(),
        imageUrl: joi.string(),
        status: joi.string().valid(Object.values(POST_STATUS)),
      }),
      (_: any, args: any, { user }: any) => PostService.updatePost(args, user),
    ),

    deletePost: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      schemaValidation({
        id: joi.string().uuid(),
      }),
      (_: any, args: { id: string }) => PostService.deletePost(args),
    ),
  },
};

export default resolver;
