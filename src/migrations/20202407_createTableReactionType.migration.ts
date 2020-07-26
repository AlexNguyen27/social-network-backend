import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(() => queryInterface.createTable('REACTION_TYPE', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  })),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('REACTION_TYPE'),
};
export default migration;
