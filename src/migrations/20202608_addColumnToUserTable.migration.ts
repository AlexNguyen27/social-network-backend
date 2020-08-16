import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.addColumn('USER', 'quote', {
      type: DataTypes.TEXT,
    }, { transaction });

    await queryInterface.addColumn('USER', 'dob', {
      type: DataTypes.DATEONLY,
    }, { transaction });
  }),
  down: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.removeColumn('USER', 'quote', { transaction });
    await queryInterface.removeColumn('USER', 'dob', { transaction })
  })
};
export default migration;
