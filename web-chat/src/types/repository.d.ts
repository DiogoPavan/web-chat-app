import { Knex } from 'knex';

import { IMessageRepository } from './message';
import { IUserRepository } from './user';

export type RepositoryContext = {
  database: Knex;
  tableName: string;
};

export type RepositoryContainer = {
  userRepository: IUserRepository;
  messageRepository: IMessageRepository;
};

export type Database = Knex;
