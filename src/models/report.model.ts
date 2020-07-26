import { Model, DataTypes } from 'sequelize';

import { REPORT_STATUS } from 'src/components/constants';
import sequelize from '.';
// import Post from './post.model';
// import User from './user.model';

class Report extends Model {
  public reportedBy: string;

  public postId: string;

  public reason: string;

  public description: string;

  public imageUrl: string;

  public status: string;

  public createdAt: Date;

  public updatedAt: Date;
}

Report.init({
  reportedBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'USER',
      key: 'id',
    },
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
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
