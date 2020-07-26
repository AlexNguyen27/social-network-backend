const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || 'd73dhwybb',
    algorithm: process.env.JWT_ALGORITHM || 'HS256',
    expiresIn: process.env.JWT_EXPIRES_IN || '30m',
  },
  port: process.env.PORT || 9000,
  pgHost: process.env.PG_HOST || 'db',
  pgPort: (process.env.PG_PORT as number | undefined) || 5432,
  pgDB: process.env.PG_DB || 'social_network',
  pgUser: process.env.PG_USER || 'postgres',
  pgPassword: process.env.PG_PASSWORD || 'postgres',
};

export default config;
