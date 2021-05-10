import { IRoomService, Rooms } from '../types/rooms';
import { ServiceContext } from '../types/service';

export class RoomService implements IRoomService {
  private roomRepository: ServiceContext['roomRepository'];

  constructor({ roomRepository }: ServiceContext) {
    this.roomRepository = roomRepository;
  }

  findAll(): Promise<Rooms[]> {
    return this.roomRepository.findAll();
  }
}
