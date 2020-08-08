import { Model, DataTypes } from 'sequelize';

import sequelize from '.';

class ReactionType extends Model {
  public id: string;

  public name: string;
}

ReactionType.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
}, {
  sequelize,
  modelName: 'REACTION_TYPE',
  timestamps: false,
});

export default ReactionType;
