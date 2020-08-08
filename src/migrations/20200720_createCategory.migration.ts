import { QueryInterface, DataTypes } from 'sequelize';
import { POST_STATUS } from '../components/constants';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction((t) => queryInterface.createTable('CATEGORY', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM(POST_STATUS.public, POST_STATUS.private),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  }, {
    transaction: t,
  })),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('CATEGORY'),
};

export default migration;
