import { v4 as uuidv4 } from 'uuid';

import { User, IUserRepository } from '../types/user';
import { RepositoryContext, Database } from '../types/repository';

export default class UserRepository implements IUserRepository {
  private database: Database;
  private tableName: string;

  constructor({
    database,
    tableName,
  }: RepositoryContext) {
    this.database = database;
    this.tableName = tableName
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
    return this.database(this.tableName).select('*').where({ username }).first();
  }
}
