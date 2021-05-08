import { Knex } from 'knex';

import { IUserRepository } from './user';

export type RepositoryContext = {
  database: Knex;
  tableName: string;
};

export type RepositoryContainer = {
  userRepository: IUserRepository;
};

export type Database = Knex;
