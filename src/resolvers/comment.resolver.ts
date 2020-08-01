import joi from 'joi';
import CategoryService from '../services/category.service';
import { middleware, tokenValidation, schemaValidation } from '../components';
import { ROLE, POST_STATUS } from '../components/constants';
import CommentService from '../services/comment.service';

const resolver = {
  Query: {
    getCommentsbyPostId: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      schemaValidation({
        postId: joi.string().uuid(),
      }),
      (_: any, args: any) => CommentService.getCommentsbyPostId(args),
    )
  },
  Mutation: {
    createComment: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      schemaValidation({
        comment: joi.string(),
        userId: joi.string().uuid(),
        postId: joi.string().uuid(),
        parentId: joi.string().uuid(),
      }),
      (_: any, args: any) => CommentService.createComment(args),
    ),

    updateComment: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      schemaValidation({
        id: joi.string().uuid(),
        comment: joi.string(),
      }),
      (_: any, args: any, { user }: any) => CommentService.updateComment(args, user),
    ),

    deleteComment: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      schemaValidation({
        id: joi.string().uuid(),
      }),
      (_: any, args: { id: string } ) => CommentService.deleteComment(args),
    )
  },
};

export default resolver;
