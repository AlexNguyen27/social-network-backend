import { ExistsError } from '../components/errors';
// import moment from 'moment';
import Post from '../models/post.model';
import { POST_STATUS, ROLE } from '../components/constants';
import Comment from '../models/comment.model';
import UserService from './user.service';
import { Op } from 'sequelize';
import CategoryService from './category.service';
import { AuthenticationError } from '../components/errors/businessErrors';
import Reaction from '../models/reaction.model';
import User from '../models/user.model';
import Category from '../models/category.model';
import { truncateMultilineString } from '../utils/formatString';
import Follower from '../models/follower.model';
// import Category from '../models/category.model';

// TODO: AADD GET POST BY FOLLOWER ID
// TODO: GET REACTION OF THE POST ALSO
class PostService {
  // GET POST BY USER ID
  static async getPosts(filter: any, user: any) {
    const { role, userId } = user;

    let whereCondition: any;
    // ADMIN
    if (filter.all) {
      const allPosts = await Post.findAll({
        include: [
          {
            model: Comment,
            as: 'comments',
            required: false,
          },
          {
            model: Reaction,
            as: 'reactions',
            where: { reactionTypeId: '9d31b9c1-e375-4dc5-9335-0c8879695163' }
          },
          {
            model: Category,
            as: 'category',
          },
          {
            model: User,
            as: 'user',
          },
        ],
        order: [['createdAt', 'DESC'], ['comments', 'createdAt', 'DESC']],
      });

      let formatedAllPosts: any = allPosts;
      formatedAllPosts = formatedAllPosts.map((item: any) => ({
        ...item,
        description: truncateMultilineString(item.description, 200),
      }));
      return formatedAllPosts;
    }

    let followUsers;
    if (role === ROLE.user) {
      followUsers = await User.findAll({
        where: { id: userId },
        include: [
          {
            model: Follower,
            as: 'followed',
            attributes: ['toUserId']
          }
        ]
      })

      console.log(followUsers, '00000000000000000000')
      whereCondition = {
        [Op.and]: [
          { userId: [...followUsers] },
          { status: POST_STATUS.public },
        ],

      };
    } else {
      whereCondition = {
        [Op.or]: [
          { status: POST_STATUS.public },
          { status: POST_STATUS.private }
        ]
      };
    }


    const posts = await Post.findAll({
      include: [
        {
          model: Category,
          as: 'category',
        },
        {
          model: User,
          as: 'user',
        },
        {
          model: Comment,
          as: 'comments',
          required: false,
        },
        {
          model: Reaction,
          as: 'reactions',
          required: false,
          where: { reactionTypeId: '9d31b9c1-e375-4dc5-9335-0c8879695163' }
        },
      ],
      where: whereCondition,
      order: [['createdAt', 'DESC'], ['comments', 'createdAt', 'DESC']],
    });
    let formatedPosts: any = posts;
    formatedPosts = formatedPosts.map((item: any) => ({
      ...item,
      ...item.dataValues,
      description: truncateMultilineString(item.description, 200),
    }));
    return formatedPosts;
  }

  static async createPost(data: any) {
    const { userId, categoryId } = data;

    if (!data.status) {
      data.status = POST_STATUS.private;
    }

    // CHECK IF USER AND CATEGORY EXITS
    await UserService.findUserById(userId);
    await CategoryService.findCategoryById(categoryId);

    return Post.create({ ...data });
  }

  static findPostById({ id }: { id: string }) {
    return Post.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: Category,
          as: 'category',
        },
        {
          model: Comment,
          as: 'comments',
          required: false,
        },
        {
          model: Reaction,
          as: 'reactions',
          required: false,
          where: { reactionTypeId: '9d31b9c1-e375-4dc5-9335-0c8879695163' }
        },
      ],
    }).then((post) => {
      if (!post) throw new ExistsError('Post not found');
      return { ...post.toJSON() };
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
