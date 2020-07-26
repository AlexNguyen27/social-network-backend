import { Model, DataTypes } from 'sequelize';

import sequelize from '.';

import User from './user.model';

class Experience extends Model {
  public id: string;

  public userId: string;

  public title: string;

  public company: string;

  public years: string;

  public createdAt: Date;

  static associate() {
    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });
  }
}

Experience.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'USER',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  years: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'EXPERIENCE',
});

export default Experience;
