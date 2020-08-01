import { ExistsError } from '../components/errors';
// import moment from 'moment';
import Post from '../models/post.model';
import { POST_STATUS, ROLE } from '../components/constants';
import Comment from '../models/comment.model';
import UserService from './user.service';
import CategoryService from './category.service';
import { AuthenticationError } from '../components/errors/businessErrors';
// import Category from '../models/category.model';

// TODO: AADD GET POST BY FOLLOWER ID
// TODO: GET REACTION OF THE POST ALSO
class PostService {

  // GET POST BY USER ID
  static getPosts(filter: any, user: any) {

    let whereCondition;
    // ADMIN
    if (filter.all) {
      return Post.findAll({
        include: [
          {
            model: Comment,
            as: 'comments',
            required: false,
          },
        ],
        order: [['createdAt', 'DESC'], ['comments', 'createdAt', 'DESC']]
      })
    }

    if (user.role === ROLE.user && filter.userId === user.userId) {
      whereCondition = {
        userId: filter.userId
      }
    } else {
      whereCondition = {
        status: POST_STATUS.public,
        userId: filter.userId
      }
    }

    return Post.findAll({
      include: [
        {
          model: Comment,
          as: 'comments',
          required: false,
        },
      ],
      where: whereCondition,
      order: [['createdAt', 'DESC'], ['comments', 'createdAt', 'DESC']]
    })
  }

  static async createPost(data: any) {
    const { userId, categoryId } = data;

    if (!data.status) {
      data.status = POST_STATUS.private
    }

    // CHECK IF USER AND CATEGORY EXITS
    await UserService.findUserById(userId);
    await CategoryService.findCategoryById(categoryId);

    return Post.create({ ...data });
  }

  static findPostById({ id }: { id: string }) {
    return Post.findOne({ where: { id } }).then((post) => {
      if (!post) throw new ExistsError('Post not found');
      return {...post.toJSON()};
    });
  }

  static async updatePost(data: any, user: any) {
    const { id, categoryId } = data;
    const { role, userId } = user;

    const currentPost: any = await this.findPostById({ id: data.id });

    if (role === ROLE.user && currentPost.userId !== userId) {
      throw new AuthenticationError('Your role is not allowed');
    }

    if (categoryId) {
      await CategoryService.findCategoryById(categoryId);
    }

    await Post.update({ ...data }, { where: { id } });

    const updatedPost = await this.findPostById({ id });
    return updatedPost;
  }

  static async deletePost({ id }: { id: string }) {
    await this.findPostById({ id });
    try {
      await Post.destroy({ where: { id } });
      return {
        status: 200,
        message: 'Delete successfully',
      };
    } catch (err) {
      throw err;
    }
  }
}

export default PostService;
