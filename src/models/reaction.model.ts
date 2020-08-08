import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

import ReactionType from './reactionType.model';

class Reaction extends Model {
  public userId: string;

  public postId: string;

  public reactionTypeId: string;

  public createdAt: Date;

  static associate() {
    // this.belongsTo(User, {
    //   as: 'user',
    //   foreignKey: 'userId'
    // });
    // this.belongsTo(Post, {
    //   as: 'post',
    //   foreignKey: 'postId'
    // });
    this.belongsTo(ReactionType, {
      as: 'reactionType',
      foreignKey: 'reactionTypeId',
    });
  }
}

Reaction.init({
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
  },
  reactionTypeId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'ReactionType',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'REACTION',
  timestamps: false,
});

export default Reaction;
