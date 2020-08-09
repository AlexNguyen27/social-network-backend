import { Model, DataTypes } from 'sequelize';

import { REPORT_STATUS } from '../components/constants';
import sequelize from '.';
import User from './user.model';
import Post from './post.model';

class Report extends Model {
  public reportedBy: string;

  public postId: string;

  public reason: string;

  public description: string;

  public imageUrl: string;

  public status: string;

  public createdAt: Date;

  public updatedAt: Date;

  static associate() {
    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'reportedBy',
    });
    this.belongsTo(Post, {
      as: 'post',
      foreignKey: 'postId',
    });
  }
}

Report.init({
  reportedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'USER',
      key: 'id',
    },
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'POST',
      key: 'id',
    },
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  imageUrl: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM(REPORT_STATUS.approve, REPORT_STATUS.banned, REPORT_STATUS.waiting_for_approve),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'REPORT',
});

export default Report;
