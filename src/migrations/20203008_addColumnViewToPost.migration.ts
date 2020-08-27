import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.addColumn('POST', 'view', {
      type: DataTypes.BIGINT,
    }, { transaction });


  }),
  down: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.removeColumn('POST', 'view', { transaction });
  })
};
export default migration;
