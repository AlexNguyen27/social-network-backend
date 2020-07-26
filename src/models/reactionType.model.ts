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
    validate: {
      notEmpty: true,
    },
  },
}, {
  sequelize,
  modelName: 'REACTIONTYPE',
});

export default ReactionType;
