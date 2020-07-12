const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 9000,
  pgHost: process.env.PG_HOST || 'db',
  pgPort: (process.env.PG_PORT as number | undefined) || 5432,
  pgDB: process.env.PG_DB || 'social_network',
  pgUser: process.env.PG_USER || 'postgres',
  pgPassword: process.env.PG_PASSWORD || 'postgres',
};

export default config;
