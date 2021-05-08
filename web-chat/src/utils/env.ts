import dotenv from 'dotenv';

dotenv.config();

const env = {
  nodeEnv: process.env.NODE_ENV as string,
  httpPort: parseInt(process.env.HTTP_PORT || '', 10),

  databaseHost: process.env.DB_HOST,
  databasePort: process.env.DB_PORT,
  databaseUser: process.env.DB_USER,
  databasePassword: process.env.DB_PASSWORD,
  databaseName: process.env.DB_NAME,

  authSecret: process.env.AUTH_SECRET,
};

export default env;
