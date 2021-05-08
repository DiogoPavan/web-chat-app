
import knex from '../../database/connection';

import UserRepository from '../repositories/user';
import UserService from '../services/user';
import { RepositoryContainer } from '../types/repository';
import { ServiceContainer } from '../types/service';

export class Container {
  private createRepositoryContainer(): RepositoryContainer {
    return {
      userRepository: new UserRepository({
        database: knex,
        tableName: 'users',
      })
    }
  }

  private createServiceContainer(respositoryContainer: RepositoryContainer): ServiceContainer {
    return {
      userService: new UserService(respositoryContainer),
    }
  }

  createContainer() {
    const respositoryContainer = this.createRepositoryContainer();

    return this.createServiceContainer(respositoryContainer);
  }
}
