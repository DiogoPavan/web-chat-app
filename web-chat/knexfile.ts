import { env } from './src/utils/env';

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: env.databaseHost,
      port: env.databasePort,
      user: env.databaseUser,
      password: env.databasePassword,
      database: env.databaseName,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
