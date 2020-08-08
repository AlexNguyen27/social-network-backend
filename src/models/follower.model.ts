import { Model, DataTypes } from 'sequelize';

import sequelize from '.';
import User from './user.model';

class Follower extends Model {
  public fromUserId: string;

  public toUserId: string;

  public createdAt: Date;

  static associate() {
    this.belongsTo(User, {
      as: 'fromUser',
      foreignKey: 'fromUserId',
      onDelete: 'CASCADE',
    });
    this.belongsTo(User, {
      as: 'toUser',
      foreignKey: 'toUserId',
      onDelete: 'CASCADE',
    });
  }
}

Follower.init({
  fromUserId: {
    type: DataTypes.UUID,
    references: {
      model: 'USER',
      key: 'id',
    },
  },
  toUserId: {
    type: DataTypes.UUID,
    references: {
      model: 'USER',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'FOLLOWER',
  updatedAt: false,
});

export default Follower;
