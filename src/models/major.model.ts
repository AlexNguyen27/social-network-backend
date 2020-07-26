import { Model, DataTypes } from 'sequelize';

import sequelize from '.';

class Major extends Model {
  public id: string;

  public name: string;
}

Major.init({
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
  modelName: 'MAJOR',
});

export default Major;
