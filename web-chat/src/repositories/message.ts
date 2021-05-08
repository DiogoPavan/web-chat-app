import { v4 as uuidv4 } from 'uuid';

import { IMessageRepository, Message } from '../types/message';
import { RepositoryContext } from '../types/repository';

export class MessageRepository implements IMessageRepository {
  private database: RepositoryContext['database'];
  private tableName: RepositoryContext['tableName'];

  constructor({
    database,
    tableName,
  }: RepositoryContext) {
    this.database = database;
    this.tableName = tableName;
  }

  async createMessage(message: Message): Promise<Message> {
    const id = uuidv4();

    await this.database(this.tableName).insert({
      id,
      ...message,
    });

    return message;
  }
}
