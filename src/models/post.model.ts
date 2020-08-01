import { Model, DataTypes } from 'sequelize';

import sequelize from '.';
import { POST_STATUS } from '../components/constants';

import Category from './category.model';
import User from './user.model';
import Reaction from './reaction.model';
import Report from './report.model';

class Post extends Model {
  public id: string;

  public title: string;

  public description: string;

  public imageUrl: string;

  public status: string;

  public categoryId: string;

  public userId: string;

  public createdAt: Date;

  public updatedAt: Date;

  public category?: Category;

  static associate() {
    this.belongsTo(Category, {
      as: 'category',
      foreignKey: 'categoryId',
    });
    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });
    this.belongsToMany(User, {
      through: Reaction,
    });
    // AUTO CREATE PRIMARY KEY OF POST AND USER IN REPORT TABLE
    this.belongsToMany(User, {
      through: Report,
    });
  }
}

Post.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM(POST_STATUS.public, POST_STATUS.private),
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'USER',
      key: 'id',
    },
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'CATEGORY',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'POST',
});

export default Post;