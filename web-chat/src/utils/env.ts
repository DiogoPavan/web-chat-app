import dotenv from 'dotenv';

dotenv.config();

const env = {
  httpPort: parseInt(process.env.HTTP_PORT || '', 10),
  databaseHost: process.env.DB_HOST,
  databasePort: process.env.DB_PORT,
  databaseUser: process.env.DB_USER,
  databasePassword: process.env.DB_PASSWORD,
  databaseName: process.env.DB_NAME,
};

export { env };
