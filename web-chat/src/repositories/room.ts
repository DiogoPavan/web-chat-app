import { RepositoryContext } from '../types/repository';
import { IRoomRepository, Rooms } from '../types/rooms';

export class RoomRepository implements IRoomRepository {
  private database: RepositoryContext['database'];
  private tableName: RepositoryContext['tableName'];

  constructor({
    database,
    tableName,
  }: RepositoryContext) {
    this.database = database;
    this.tableName = tableName;
  }

  async findAll(): Promise<Rooms[]> {
    const room = await this.database(this.tableName).select([
      'id',
      'name',
    ]);

    return room;
  }
}
