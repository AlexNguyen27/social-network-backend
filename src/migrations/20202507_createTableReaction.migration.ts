import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(() => queryInterface.createTable('REACTION', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
      references: {
        model: 'USER',
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
        model: 'REACTION_TYPE',
        key: 'id',
      },
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
      references: {
        model: 'POST',
        key: 'id',
      },
    },
  })),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('REACTION'),
};
export default migration;
