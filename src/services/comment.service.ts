import { AuthenticationError } from 'apollo-server';
import User from '../models/user.model';
import Post from '../models/post.model';
import { ExistsError } from '../components/errors';
import Comment from '../models/comment.model';
import UserService from './user.service';
import PostService from './post.service';

class CommentService {
  static getCommentsbyPostId({ postId }: { postId: string }) {
    return Comment.findAll({
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
      where: { postId },
    });
  }

  static async createComment(data: any) {
    const { userId, postId } = data;

    // CHECK IF USERID AND POSTID IS EXITS
    await UserService.findUserById(userId);
    await PostService.findPostById({ id: postId });

    if (data.parentId) {
      await this.findCommentById(data.parentId, 'Parent comment id not found');
    }

    return Comment.create({
      ...data,
    });
  }

  static async findCommentById(id: string, message = 'Comment not found') {
    return Comment.findOne({ where: { id } }).then((cmt) => {
      if (!cmt) throw new ExistsError(message);
      return { ...cmt.toJSON() };
    });
  }

  static async updateComment(data: any, user: any) {
    const { id } = data;
    const currentCmt: any = await this.findCommentById(id);
    if (currentCmt.userId !== user.userId && user.role === 'user') {
      throw new AuthenticationError('Your role is not allowed');
    }

    await Comment.update(data, { where: { id } });

    const currentComment = await this.findCommentById(id);
    return currentComment;
  }

  // TODO : DELETE COMMENT SHOULD DELETE CHILD COMMENT
  static async deleteComment({ id }: { id: string }) {
    await this.findCommentById(id);

    // const hasChildsCmt = await Comment.findAll({
    //   where: { parentId: id },
    // });

    // if (hasChildsCmt.length > 0) {
    //   // throw new ExistsError('This comment has child comment');

    // }

    try {
      await Comment.destroy({ where: { id } });
      return {
        status: 200,
        message: 'Delete successfully',
      };
    } catch (err) {
      throw err;
    }
  }
}

export default CommentService;
