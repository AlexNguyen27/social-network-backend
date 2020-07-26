import { Model, DataTypes } from 'sequelize';

import sequelize from '.';
import User from './user.model';
import School from './school.model';
import Major from './major.model';

class Education extends Model {
  public id: string;

  public schoolId: string;

  public majorId: string;

  public degree: string;

  public userId: string;

  public createdAt: Date;

  static associate() {
    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });
    this.belongsTo(School, {
      as: 'school',
      foreignKey: 'schoolId',
    });
    this.belongsTo(Major, {
      as: 'major',
      foreignKey: 'majorId',
    });
  }
}

Education.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  schoolId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'SCHOOL',
      key: 'id',
    },
  },
  majorId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'MAJOR',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'USER',
      key: 'id',
    },
  },
  degree: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'EDUCATION',
});

export default Education;
