import { QueryInterface, DataTypes } from 'sequelize';
import { REPORT_STATUS } from '../components/constants';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction((t) => queryInterface.createTable('REPORT', {
    reportedBy: {
      type: DataTypes.UUID,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'USER',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
    transaction: t,
  })),
};

export default migration;
