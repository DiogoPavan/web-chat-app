import knex from '../../database/connection';

import { UserRepository } from '../repositories/user';
import { UserService } from '../services/user';
import { MessageRepository } from '../repositories/message';
import { MessageService } from '../services/message';

import { RepositoryContainer } from '../types/repository';
import { ServiceContainer } from '../types/service';
import { RoomRepository } from '../repositories/room';
import { RoomService } from '../services/room';

const createRepositoryContainer = (): RepositoryContainer => ({
  userRepository: new UserRepository({
    database: knex,
    tableName: 'users',
  }),
  messageRepository: new MessageRepository({
    database: knex,
    tableName: 'messages',
  }),
  roomRepository: new RoomRepository({
    database: knex,
    tableName: 'rooms',
  }),
});

const createServiceContainer = (respositoryContainer: RepositoryContainer): ServiceContainer => ({
  userService: new UserService(respositoryContainer),
  messageService: new MessageService(respositoryContainer),
  roomService: new RoomService(respositoryContainer),
});

export function createContainer(): ServiceContainer {
  const respositoryContainer = createRepositoryContainer();

  return createServiceContainer(respositoryContainer);
}
