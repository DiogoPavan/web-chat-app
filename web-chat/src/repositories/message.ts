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

    const [insertedMessage] = await this.database(this.tableName).insert({
      id,
      ...message,
    }).then(() =>{
      return this.database(this.tableName).select([
        'id',
        'createdAt',
        'message',
      ])
      .where({
        id,
      });
    });

    return insertedMessage;
  }

  async getMessagesByRoomId(roomId: string): Promise<Message[]> {
    return this.database(this.tableName)
      .join('users', 'messages.userId', 'users.id')
      .select([
        'message',
        'messages.createdAt',
        'users.username'
      ])
      .where({
        roomId,
      })
      .limit(50)
      .orderBy('messages.createdAt', 'desc');
  }
}
