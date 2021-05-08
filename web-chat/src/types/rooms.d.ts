export type Rooms = {
  id: string;
  name: string;
}

export interface IRoomRepository {
  findAll(): Promise<Rooms[]>;
}

export interface IRoomService {
  findAll(): Promise<Rooms[]>;
}
