import { Model, DataTypes } from 'sequelize';

import sequelize from '.';

class School extends Model {
  public id: string;

  public name: string;
}

School.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  sequelize,
  modelName: 'SCHOOL',
});

export default School;
