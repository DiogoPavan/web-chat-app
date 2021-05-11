import { Chance } from 'chance';

import { ServiceContext } from '../../types/service';
import { UserService } from '../user';

describe('UserService', () => {
  const chance = new Chance();

  describe('findByUsername', () => {
    it('should find user by username with success', async () => {
      const user = {
        id: chance.guid(),
        username: chance.string(),
      };

      const serviceContext = {
        userRepository: {
          signUp: jest.fn(),
          findByUsername: jest.fn().mockResolvedValue(user),
          signIn: jest.fn(),
        },
      } as unknown as ServiceContext;

      const userService = new UserService(serviceContext);

      const result = await userService.findByUsername(user.username);

      expect(result).toEqual(user);
      expect(serviceContext.userRepository.findByUsername).toBeCalledWith(user.username);
    });
  });

  describe('signUp', () => {
    it('should sign up a user with success', async () => {
      const user = {
        id: chance.guid(),
        username: chance.string(),
        password: chance.string(),
      };

      const serviceContext = {
        userRepository: {
          signUp: jest.fn().mockResolvedValue({
            id: user.id,
            username: user.username,
          }),
          findByUsername: jest.fn().mockResolvedValue(null),
          signIn: jest.fn(),
        },
      } as unknown as ServiceContext;

      const userService = new UserService(serviceContext);

      const result = await userService.signUp({
        username: user.username,
        password: user.password,
      });

      expect(result).toEqual({
        id: user.id,
        username: user.username,
      });
      expect(serviceContext.userRepository.findByUsername).toBeCalledWith(user.username);
      expect(serviceContext.userRepository.signUp).toBeCalledWith({
        username: user.username,
        password: expect.any(String),
      });
    });

    it('should throw an error when there is a user with the same username', async () => {
      const serviceContext = {
        userRepository: {
          signUp: jest.fn(),
          findByUsername: jest.fn().mockResolvedValue({}),
          signIn: jest.fn(),
        },
      } as unknown as ServiceContext;

      const userService = new UserService(serviceContext);

      await expect(userService.signUp({
        username: chance.string(),
        password: chance.string(),
      })).rejects.toThrow('An user with this username already exists');
    });
  });

  describe('signIn', () => {
    it('should sign in a user with success', async () => {
      const user = {
        id: chance.guid(),
        username: chance.string(),
        password: '123456',
      };

      const serviceContext = {
        userRepository: {
          signUp: jest.fn(),
          findByUsername: jest.fn().mockResolvedValue({
            ...user,
            password: '$2b$10$Q2Sxr/mhw2ZXGaxFc3Oq0.FVtqJISNjKD3qNuRxW0T8olK6eZ9UVW',
          }),
          signIn: jest.fn(),
        },
      } as unknown as ServiceContext;

      const userService = new UserService(serviceContext);

      const result = await userService.signIn({
        username: user.username,
        password: user.password,
      });

      expect(result).toEqual(expect.any(String));
      expect(serviceContext.userRepository.findByUsername).toBeCalledWith(user.username);
    });

    it('should throw an error when user does not exist', async () => {
      const user = {
        id: chance.guid(),
        username: chance.string(),
        password: '123456',
      };

      const serviceContext = {
        userRepository: {
          signUp: jest.fn(),
          findByUsername: jest.fn().mockResolvedValue(null),
          signIn: jest.fn(),
        },
      } as unknown as ServiceContext;

      const userService = new UserService(serviceContext);

      await expect(userService.signIn({
        username: user.username,
        password: user.password,
      })).rejects.toThrow('User does not exist');
    });

    it('should throw an error when password is incorrect', async () => {
      const user = {
        id: chance.guid(),
        username: chance.string(),
        password: '123456',
      };

      const serviceContext = {
        userRepository: {
          signUp: jest.fn(),
          findByUsername: jest.fn().mockResolvedValue(user),
          signIn: jest.fn(),
        },
      } as unknown as ServiceContext;

      const userService = new UserService(serviceContext);

      await expect(userService.signIn({
        username: user.username,
        password: user.password,
      })).rejects.toThrow('Incorrect password');
    });
  });
});
