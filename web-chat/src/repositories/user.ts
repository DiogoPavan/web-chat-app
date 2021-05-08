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

  async singUp(user: User): Promise<User> {
    const { name, password } = user;
    const id = uuidv4();

    await this.database(this.tableName).insert({
      id,
      name,
      password
    });

    return {
      id,
      name,
    };
  }

  async findByName(name: string): Promise<User> {
    return this.database(this.tableName).select('*').where({ name }).first();
  }
}
