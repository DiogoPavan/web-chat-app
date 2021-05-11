import { Chance } from 'chance';
import { ServiceContext } from '../../types/service';

import { RoomService } from '../room';

describe('RoomService', () => {
  const chance = new Chance();

  describe('findAll', () => {
    it('should find rooms with success', async () => {
      const rooms = [{
        id: chance.guid(),
        name: chance.string(),
      }, {
        id: chance.guid(),
        name: chance.string(),
      }];

      const serviceContext = {
        roomRepository: {
          findAll: jest.fn().mockResolvedValue(rooms),
        },
      } as unknown as ServiceContext;

      const roomService = new RoomService(serviceContext);

      const result = await roomService.findAll();

      expect(result).toEqual(rooms);
      expect(serviceContext.roomRepository.findAll).toBeCalled();
    });
  });
});
