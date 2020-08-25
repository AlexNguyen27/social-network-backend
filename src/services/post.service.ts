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
import ReactionType from '../models/reactionType.model';

// TODO: AADD GET POST BY FOLLOWER ID
// TODO: GET REACTION OF THE POST ALSO
class PostService {

  // GET ALL POSTS
  static async getPosts(filter: any, user: any) {
    const { role, userId } = user;

    let whereCondition: any;

     // GET REACTION TYPE LIKE
     const reactionLike: any = await ReactionType.findOne({
      where: { name: 'like' },
      attributes: ['id']
    });

    const { id: reactionLikeId } = reactionLike;

    // GET ALL PUBLIC POST FOR SEARCHING
    if (filter.all) {
      const allPosts = await Post.findAll({
        where: { status: POST_STATUS.public },
        include: [
          {
            model: Comment,
            as: 'comments',
            required: false,
          },
          {
            model: Reaction,
            as: 'reactions',
            required: false,
            where: { reactionTypeId: reactionLikeId }
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
        ...item.dataValues,
        description: truncateMultilineString(item.description, 200),
      }));
      return formatedAllPosts;
    }

    let followUsers;
    if (role === ROLE.user) {
      followUsers = await Follower.findAll({
        where: { fromUserId: userId },
        attributes: ['toUserId']
      })

      const followedUserArr = followUsers.map(item => item.toUserId)
      whereCondition = {
        [Op.and]: [
          { userId: [...followedUserArr, userId] },
          { status: POST_STATUS.public },
        ],

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
          where: { reactionTypeId: reactionLikeId }
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

    const newPost = await Post.create({ ...data });

    return await this.findPostById({ id: newPost.id });
  }

  static async findPostById({ id }: { id: string }) {
     // GET REACTION TYPE LIKE
     const reactionLike: any = await ReactionType.findOne({
      where: { name: 'like' },
      attributes: ['id']
    });

    const { id: reactionLikeId } = reactionLike;

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
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['username', 'firstName', 'lastName', 'imageUrl']
            }
          ],
          required: false,
        },
        {
          model: Reaction,
          as: 'reactions',
          required: false,
          where: { reactionTypeId: reactionLikeId }
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
