import { Chance } from 'chance';

import { RepositoryContext } from '../../types/repository';
import { UserRepository } from '../user';

describe.skip('UserRepository', () => {
  const chance = new Chance();

  let data;

  beforeAll(() => {
    data = {
      id: chance.guid({ version: 4 }),
      username: chance.string(),
      password: chance.string(),
    };
  });

  describe('signUp', () => {
    it('should sign up an user with success at database', async () => {
      const fakeDataBase = {
        insert: jest.fn(),
      };

      const repositoryContext = {
        database: fakeDataBase,
      } as unknown as RepositoryContext;

      const userRepository = new UserRepository(repositoryContext);

      const result = await userRepository.signUp({
        username: data.username,
        password: data.password,
      });

      expect(result).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          username: data.username,
        }),
      );
      expect(repositoryContext.database.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          id: expect.any(String),
          username: data.username,
          password: data.password,
        }),
      );
    });

    it('should throw an error when inserting user in the database', async () => {
      const fakeDataBase = {
        insert: jest.fn(() => {
          throw new Error('Insert Error');
        }),
      };

      const repositoryContext = {
        database: fakeDataBase,
      } as unknown as RepositoryContext;

      const userRepository = new UserRepository(repositoryContext);

      await expect(userRepository.signUp(data)).rejects.toThrow('Insert Error');
    });
  });

  describe('findByUsername', () => {
    it('should find user by username with success from database', async () => {
      const fakeWhere = {
        where: jest.fn(() => ({
          first: jest.fn().mockResolvedValue(data),
        })),
      };

      const fakeDataBase = {
        select: jest.fn(() => fakeWhere),
      };

      const repositoryContext = {
        database: fakeDataBase,
      } as unknown as RepositoryContext;

      const userRepository = new UserRepository(repositoryContext);

      const result = await userRepository.findByUsername(data.username);

      expect(repositoryContext.database.select).toBeCalledWith([
        'id',
        'username',
        'password',
      ]);
      expect(fakeWhere.where).toBeCalledWith({
        username: data.username,
      });
      expect(result).toEqual(data);
    });

    it('should throw an error when selecting user from the database', async () => {
      const fakeDataBase = {
        select: jest.fn(() => {
          throw new Error('SQL Error');
        }),
      };

      const repositoryContext = {
        database: fakeDataBase,
      } as unknown as RepositoryContext;

      const userRepository = new UserRepository(repositoryContext);

      await expect(userRepository.findByUsername(data.username)).rejects.toThrow('SQL Error');
    });
  });
});
