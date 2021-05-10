import dotenv from 'dotenv';
import { Env } from '../types/env';

dotenv.config();

const env: Env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  appPort: parseInt(process.env.APP_PORT || '3000', 10),

  databaseHost: process.env.DB_HOST || '',
  databasePort: parseInt(process.env.DB_PORT || '3306', 10),
  databaseUser: process.env.DB_USER || '',
  databasePassword: process.env.DB_PASSWORD || '',
  databaseName: process.env.DB_NAME || '',

  authSecret: process.env.AUTH_SECRET,
  botName: process.env.BOT_NAME,

  redisPort: parseInt(process.env.REDIS_PORT || '3306', 10),
  redisHost: process.env.REDIS_HOST,
};

export default env;
