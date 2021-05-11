import { Chance } from 'chance';

import { RepositoryContext } from '../../types/repository';
import { MessageRepository } from '../message';

describe.skip('MessageRepository', () => {
  const chance = new Chance();

  describe('createMessage', () => {
    let data;

    beforeAll(() => {
      data = {
        id: chance.guid({ version: 4 }),
        message: chance.string(),
        userId: chance.guid({ version: 4 }),
        roomId: chance.guid({ version: 4 }),
        createdAt: chance.date({ string: true }),
      };
    });

    it('should create message with success at database', async () => {
      const fakeDataBase = {
        insert: jest.fn(),
        select: jest.fn(() => ({
          where: jest.fn().mockResolvedValue([{
            id: data.id,
            createdAt: data.createdAt,
            message: data.message,
          }]),
        })),
      };

      const repositoryContext = {
        database: fakeDataBase,
      } as unknown as RepositoryContext;

      const messageRepository = new MessageRepository(repositoryContext);

      const result = await messageRepository.createMessage(data);

      expect(result).toEqual(
        expect.objectContaining({
          id: data.id,
          message: data.message,
          createdAt: data.createdAt,
        }),
      );
      expect(repositoryContext.database.insert).toHaveBeenCalled();
      expect(repositoryContext.database.select).toHaveBeenCalled();
    });

    it('should throw an error when inserting message in the database', async () => {
      const fakeDataBase = {
        insert: jest.fn(() => {
          throw new Error('Insert Error');
        }),
      };

      const repositoryContext = {
        database: fakeDataBase,
      } as unknown as RepositoryContext;

      const messageRepository = new MessageRepository(repositoryContext);

      await expect(messageRepository.createMessage(data)).rejects.toThrow('Insert Error');
    });

    it('should throw an error when selecting message after inserting into the database', async () => {
      const fakeDataBase = {
        insert: jest.fn(),
        select: jest.fn(() => {
          throw new Error('Select Error');
        }),
      };

      const repositoryContext = {
        database: fakeDataBase,
      } as unknown as RepositoryContext;

      const messageRepository = new MessageRepository(repositoryContext);

      await expect(messageRepository.createMessage(data)).rejects.toThrow('Select Error');
    });
  });

  describe('findByRoomId', () => {
    it('should find messages by roomId with success from database', async () => {
      const messages = [{
        id: chance.guid(),
        message: chance.string(),
      }, {
        id: chance.guid(),
        message: chance.string(),
      }];
      const roomId = chance.guid({ version: 4 });

      const fakeOrderBy = {
        orderBy: jest.fn().mockResolvedValue(messages),
      };

      const fakeLimit = {
        limit: jest.fn(() => fakeOrderBy),
      };

      const fakeWhere = {
        where: jest.fn(() => fakeLimit),
      };

      const fakeSelect = {
        select: jest.fn(() => fakeWhere),
      };

      const fakeDataBase = {
        join: jest.fn(() => fakeSelect),
      };

      const repositoryContext = {
        database: fakeDataBase,
      } as unknown as RepositoryContext;

      const messageRepository = new MessageRepository(repositoryContext);

      const result = await messageRepository.findByRoomId(roomId);

      expect(repositoryContext.database.join).toBeCalledWith('users', 'messages.userId', 'users.id');
      expect(fakeSelect.select).toBeCalledWith([
        'message',
        'messages.createdAt',
        'users.username',
      ]);
      expect(fakeWhere.where).toBeCalledWith({
        roomId,
      });
      expect(fakeLimit.limit).toBeCalledWith(50);
      expect(fakeOrderBy.orderBy).toBeCalledWith('messages.createdAt', 'desc');
      expect(result).toEqual(messages);
    });

    it('should throw an error when selecting message from the database', async () => {
      const roomId = chance.guid({ version: 4 });
      const fakeDataBase = {
        join: jest.fn(() => {
          throw new Error('SQL Error');
        }),
      };

      const repositoryContext = {
        database: fakeDataBase,
      } as unknown as RepositoryContext;

      const messageRepository = new MessageRepository(repositoryContext);

      await expect(messageRepository.findByRoomId(roomId)).rejects.toThrow('SQL Error');
    });
  });
});
