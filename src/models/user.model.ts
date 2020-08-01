import { Model, DataTypes } from 'sequelize';

import sequelize from '.';
import { ROLE } from '../components/constants';

import Post from './post.model';
import Comment from './comment.model';
import Reaction from './reaction.model';
import Follower from './follower.model';
import Experience from './experience.model';
import Report from './report.model';

class User extends Model {
  public id: string;

  public name: string;

  public username: string;

  public firstName: string;

  public lastName: string;

  public email: string;

  public phone: string;

  public address: string;

  public password: string;

  public imageUrl: string;

  public githubUsername: string;

  public role: string;

  public createdAt: Date;

  public updatedAt: Date;

  static associate() {
    this.hasMany(Post, {
      as: 'posts',
      foreignKey: 'userId',
    });
    this.hasMany(Comment, {
      as: 'comments',
      foreignKey: 'userId',
    });
    this.hasMany(Experience, {
      as: 'experiences',
      foreignKey: 'userId',
    });
    // https://sequelize.org/master/manual/assocs.html
    this.belongsToMany(Post, {
      foreignKey: 'userId',
      through: Reaction,
    });

    this.belongsToMany(Post, {
      foreignKey: 'reportedBy',
      through: Report,
    });

    this.belongsToMany(User, {
      foreignKey: 'fromUserId',
      as: 'fromUser',
      through: Follower,
    });
    this.belongsToMany(User, {
      as: 'toUser',
      foreignKey: 'toUserId',
      through: Follower,
    });
    // this.belongsToMany(Post, {
    //   foreignKey: 'userId',
    //   through: Comment,
    // });
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.TEXT,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: {
      //     args: [6, 42],
      //     msg: "Password must be more than 6 and 42 characters",
      //   },
      // },
    },
    imageUrl: {
      type: DataTypes.TEXT,
    },
    githubUsername: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(ROLE.user, ROLE.admin),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'USER',
  }
);

export default User;
