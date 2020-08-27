import { QueryInterface } from 'sequelize';
const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.addConstraint('COMMENT', ['parentId'], {
      type: 'foreign key',
      references: {
        table: 'COMMENT',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }),
};
export default migration;
