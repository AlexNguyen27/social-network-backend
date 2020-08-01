import Category from '../models/category.model';
import { ExistsError } from '../components/errors';
import moment from 'moment';
import Post from '../models/post.model';
import { POST_STATUS, ROLE } from '../components/constants';

class CategoryService {
  static getCategories(user: any) {

    let whereCondition;
    if (user.role === ROLE.user) {
      whereCondition = {
        status: POST_STATUS.public
      }
    }
    return Category.findAll({
      include: [
        {
          model: Post,
          as: 'posts',
          required: false,
          where: {...whereCondition}
        },
      ],
      where: whereCondition,
      order: [['createdAt', 'DESC'], ['posts', 'createdAt', 'DESC']]
    });
  }

  static createCategory({ name, status = POST_STATUS.public }: { name: string, status: string }) {
    return Category.create({
      name,
      status,
      createdAt: moment()
    });
  }

  static findCategoryById(id: string) {
    return Category.findOne({ where: { id } }).then((cate) => {
      if (!cate) throw new ExistsError('Category not found');
      return cate;
    });
  }
  static async updateCategory({ id, name, status }: { id: string, name: string, status: string }) {
    await this.findCategoryById(id);
    await Category.update({ name, status }, { where: { id } });

    const currentCategory = await this.findCategoryById(id);
    return currentCategory;
  }

  static async deleteCategory({ id }: { id: string }) {
    const currentCategory = await Category.findOne({ where: { id } });
    if (!currentCategory) {
      throw new ExistsError('Category not found');
    }
    try {
      await Category.destroy({ where: { id } });
      return {
        status: 200,
        message: 'Delete successfully',
      };
    } catch (err) {
      throw err;
    }
  }
}

export default CategoryService;
