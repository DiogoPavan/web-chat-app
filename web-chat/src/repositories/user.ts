import { v4 as uuidv4 } from 'uuid';

import { User, IUserRepository } from '../types/user';
import { RepositoryContext } from '../types/repository';

export class UserRepository implements IUserRepository {
  private database: RepositoryContext['database'];
  private tableName: RepositoryContext['tableName'];

  constructor({
    database,
    tableName,
  }: RepositoryContext) {
    this.database = database;
    this.tableName = tableName;
  }

  async signUp(user: User): Promise<User> {
    const { username, password } = user;
    const id = uuidv4();

    await this.database(this.tableName).insert({
      id,
      username,
      password
    });

    return {
      id,
      username,
    };
  }

  async findByUsername(username: User['username']): Promise<User> {
    return this.database(this.tableName).select([
      'id',
      'username',
      'password',
    ]).where({ username }).first();
  }
}
