import { Model, DataTypes } from 'sequelize';

import sequelize from '.';
import Post from './post.model';
import { POST_STATUS } from '../components/constants';

class Category extends Model {
  public id: string;

  public name: string;

  public posts?: Post[];

  static associate() {
    this.hasMany(Post, {
      as: 'posts',
      foreignKey: 'categoryId',
    });
  }
}

Category.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM(POST_STATUS.public, POST_STATUS.private),
  },
}, {
  sequelize,
  modelName: 'CATEGORY',
});

export default Category;
