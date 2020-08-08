import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.createTable('FOLLOWER', {
      fromUserId: {
        type: DataTypes.UUID,
        primaryKey: true,
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
      toUserId: {
        type: DataTypes.UUID,
        validate: {
          notEmpty: true,
        },
        primaryKey: true,
        references: {
          model: 'USER',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
      },
    }, { transaction: t });

    // await QueryInterface.addConstraint('FOLLOWER', ['fromUserId', 'toUserId'], {
    //   type:'primary key',
    //   name: 'follower_id'
    // })
  }),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('FOLLOWER'),
};

export default migration;
