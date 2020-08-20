import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.addConstraint('REPORT', ['postId'], {
      type: 'foreign key',
      references: { //Required field
        table: 'POST',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('REACTION', ['postId'], {
      type: 'foreign key',
      references: { //Required field
        table: 'POST',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('REACTION', ['userId'], {
      type: 'foreign key',
      references: { //Required field
        table: 'USER',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('COMMENT', ['postId'], {
      type: 'foreign key',
      references: { //Required field
        table: 'POST',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('COMMENT', ['userId'], {
      type: 'foreign key',
      references: { //Required field
        table: 'USER',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('POST', ['userId'], {
      type: 'foreign key',
      references: { //Required field
        table: 'USER',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }),
};
export default migration;
