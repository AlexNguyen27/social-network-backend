import { Model, DataTypes } from 'sequelize';

import sequelize from '.';
import { POST_STATUS } from '../components/constants';

import Category from './category.model';
import User from './user.model';
import Reaction from './reaction.model';
import Report from './report.model';
import Comment from './comment.model';

class Post extends Model {
  public id: string;

  public title: string;

  public description: string;

  public imageUrl: string;

  public status: string;

  public categoryId: string;

  public userId: string;

  public view: number;

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
      foreignKey: 'postId',
      as: 'post',
      through: Reaction,
    });

    this.hasMany(Reaction, {
      foreignKey: 'postId',
      as: 'reactions',
    });
    // AUTO CREATE PRIMARY KEY OF POST AND USER IN REPORT TABLE
    this.belongsToMany(User, {
      foreignKey: 'postId',
      through: Report,
    });

    this.hasMany(Comment, {
      as: 'comments',
      foreignKey: 'postId',
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
  view: {
    type: DataTypes.BIGINT,
    allowNull: false,
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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
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
