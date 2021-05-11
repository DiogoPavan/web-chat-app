import { Chance } from 'chance';

import { RepositoryContext } from '../../types/repository';
import { RoomRepository } from '../room';

jest.mock('../../../database/connection', () => {
  const mKnex = {
    select: jest.fn(),
  };
  return jest.fn(() => mKnex);
});

describe.skip('RoomRepository', () => {
  const chance = new Chance();

  describe('findAll', () => {
    it('should find all rooms with success from database', async () => {
      const rooms = [{
        id: chance.guid(),
        name: chance.string(),
      }, {
        id: chance.guid(),
        name: chance.string(),
      }];

      const fakeDataBase = {
        select: jest.fn().mockResolvedValue(rooms),
      };

      const repositoryContext = {
        database: () => ({
          select: jest.fn().mockResolvedValue(rooms),
        }),
      } as unknown as RepositoryContext;

      const roomRepository = new RoomRepository(repositoryContext);

      const result = await roomRepository.findAll();

      expect(repositoryContext.database.select).toBeCalled();
      expect(result).toEqual(rooms);
    });

    it('should throw an error when selecting rooms from the database', async () => {
      const fakeDataBase = {
        select: jest.fn(() => {
          throw new Error('SQL Error');
        }),
      };

      const repositoryContext = {
        database: fakeDataBase,
      } as unknown as RepositoryContext;

      const roomRepository = new RoomRepository(repositoryContext);

      await expect(roomRepository.findAll()).rejects.toThrow('SQL Error');
    });
  });
});
