
import knex from '../../database/connection';

import { UserRepository } from '../repositories/user';
import { UserService } from '../services/user';
import { MessageRepository } from '../repositories/message';
import { MessageService } from '../services/message';

import { RepositoryContainer } from '../types/repository';
import { ServiceContainer } from '../types/service';
import { RoomRepository } from '../repositories/room';
import { RoomService } from '../services/room';

export class Container {
  private createRepositoryContainer(): RepositoryContainer {
    return {
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
    }
  }

  private createServiceContainer(respositoryContainer: RepositoryContainer): ServiceContainer {
    return {
      userService: new UserService(respositoryContainer),
      messageService: new MessageService(respositoryContainer),
      roomService: new RoomService(respositoryContainer),
    }
  }

  createContainer() {
    const respositoryContainer = this.createRepositoryContainer();

    return this.createServiceContainer(respositoryContainer);
  }
}
