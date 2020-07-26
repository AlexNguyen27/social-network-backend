import { Model, DataTypes } from 'sequelize';

import sequelize from '.';
// import User from './user.model';

class Follower extends Model {
  public fromUserId: string;

  public toUserId: string;

  public createdAt: Date;
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
});

export default Follower;
