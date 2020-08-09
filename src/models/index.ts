import { Sequelize } from 'sequelize';
import { logger } from 'juno-js';

import { config } from '../components';

// import User from './user.model';
// import School from './school.model';
// import Report from './report.model';
// import ReactionType from './reactionType.model';
// import Reaction from './reaction.model';
// import Post from './post.model';
// import Major from './major.model';
// import Follower from './follower.model';
// import Experience from './experience.model';
// import Education from './education.model';
// import Comment from './comment.model';
// import Category from './category.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: config.pgUser,
  password: config.pgPassword,
  database: config.pgDB,
  host: config.pgHost,
  port: config.pgPort,
  // eslint-disable-next-line no-console
  logging: config.nodeEnv === 'development' ? console.log : false,
  define: {
    underscored: false,
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .catch((e) => {
    logger().error('Sequelize authentication failed: ', e);
  });

// const models = {
//   User,
//   School,
//   Reaction,
//   Report,
//   ReactionType,
//   Post,
//   Major,
//   Follower,
//   Experience,
//   Education,
//   Comment,
//   Category
// }

// const db = {
//   sequelize,
//   ...models,
// }

export default sequelize;
