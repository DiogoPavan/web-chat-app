import { Knex } from 'knex';

import { IMessageRepository } from './message';
import { IRoomService } from './rooms';
import { IUserRepository } from './user';

export type RepositoryContext = {
  database: Knex;
  tableName: string;
};

export type RepositoryContainer = {
  userRepository: IUserRepository;
  messageRepository: IMessageRepository;
  roomRepository: IRoomService;
};

export type Database = Knex;
