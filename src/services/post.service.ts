import { ExistsError } from '../components/errors';
import moment from 'moment';
import Post from '../models/post.model';
import { POST_STATUS, ROLE } from '../components/constants';
import Comment from '../models/comment.model';
import UserService from './user.service';
import CategoryService from './category.service';
import { AuthenticationError } from 'apollo-server';

class PostService {
  static getPosts(filter: any, user: any) {

    let whereCondition;
    if (user.role === ROLE.user) {
      whereCondition = {
        status: POST_STATUS.public
      }
    }

    return Post.findAll({
      include: [
        {
          model: Comment,
          as: 'comments',
          required: false,
          where: whereCondition
        }
      ],
      where: whereCondition,
      order: [['createdAt', 'DESC'], ['posts', 'createdAt', 'DESC']]
    })
  }

  static async createPost(data: any) {
    const { userId, categoryId } = data;

    // CHECK IF USER AND CATEGORY EXITS
    await UserService.findUserById(userId);
    await CategoryService.findCategoryById(categoryId);

    return Post.create({
      data
    });
  }

  static findPostById(id: string) {
    return Post.findOne({ where: { id } }).then((cate) => {
      if (!cate) throw new ExistsError('Post not found');
      return cate;
    });
  }

  static async updatePost(data: any, user: any) {
    const { id, categoryId } = data;
    const { role, userId } = user;

    const currentPost = await this.findPostById(data.id);

    if (role === ROLE.user && currentPost.userId !== userId) {
      throw new AuthenticationError('Your role is not allowed');
    }

    if (categoryId) {
      await CategoryService.findCategoryById(categoryId);
    }

    await Post.update(data, { where: { id } });

    const updatedPost = await this.findPostById(id);
    return updatedPost;
  }

  static async deletePost({ id }: { id: string }) {
    const currentPost = await Post.findOne({ where: { id } });
    if (!currentPost) {
      throw new ExistsError('Post not found');
    }
    try {
      await Post.destroy({ where: { id } });
      return {
        status: 200,
        message: 'Success',
      };
    } catch (err) {
      throw err;
    }
  }
}

export default PostService;

