import { Model, DataTypes } from 'sequelize';

import sequelize from '.';
import Post from './post.model';
import User from './user.model';

class Comment extends Model {
  public id: string;

  public comment: string;

  public parentId: string;

  public userId: string;

  public postId: string;

  public createdAt: Date;

  public updatedAt: Date;

  static associate() {
    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });
    this.belongsTo(Post, {
      as: 'post',
      foreignKey: 'postId',
    });
  }
}

Comment.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  parentId: {
    type: DataTypes.UUID,
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
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'POST',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
}, {
  sequelize,
  modelName: 'COMMENT',
});

export default Comment;
