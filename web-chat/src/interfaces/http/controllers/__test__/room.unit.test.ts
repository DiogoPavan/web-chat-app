import { Chance } from 'chance';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { HttpStatus } from '../../../../types/enum';
import { ControllerContext } from '../../../../types/interface';
import { RoomController } from '../room';

describe('RoomController', () => {
  const chance = new Chance();
  let req;
  let res;
  let next;

  beforeAll(() => {
    req = new Request();
    res = new Response();
    next = jest.fn();
  });

  describe('findAll', () => {
    it('should find all rooms with success', async () => {
      const rooms = [{
        id: chance.guid(),
        name: chance.string(),
      }, {
        id: chance.guid(),
        name: chance.string(),
      }];
      const ctx = {
        container: {
          roomService: {
            findAll: jest.fn().mockResolvedValue(rooms),
          },
        },
      } as unknown as ControllerContext;

      const roomController = new RoomController(ctx);

      await roomController.findAll(req, res, next);

      expect(ctx.container.roomService.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(next).not.toHaveBeenCalled();
    });

    it('should throw an error to find all rooms', async () => {
      const ctx = {
        container: {
          roomService: {
            findAll: jest.fn(() => {
              throw new Error();
            }),
          },
        },
      } as unknown as ControllerContext;

      const roomController = new RoomController(ctx);

      await roomController.findAll(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
