import { Chance } from 'chance';
import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
import { HttpStatus } from '../../../../types/enum';
import { ControllerContext } from '../../../../types/interface';
import { UserController } from '../user';

describe('UserController', () => {
  const chance = new Chance();
  let req;
  let res;
  let next;
  let user;

  beforeAll(() => {
    req = new Request();
    res = new Response();
    next = jest.fn();
    user = {
      id: chance.guid({ version: 4 }),
      username: chance.string(),
      password: chance.string(),
    };
  });

  describe('signUp', () => {
    it('should sign up user with success', async () => {
      const ctx = {
        container: {
          userService: {
            signUp: jest.fn().mockResolvedValue(user),
          },
        },
      } as unknown as ControllerContext;

      req.setBody({
        username: user.username,
        password: user.password,
      });

      const userController = new UserController(ctx);

      await userController.signUp(req, res, next);

      expect(ctx.container.userService.signUp).toHaveBeenCalledWith({
        username: user.username,
        password: user.password,
      });
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    });

    it('should throw an error to find all rooms', async () => {
      const ctx = {
        container: {
          userService: {
            signUp: jest.fn(() => {
              throw new Error();
            }),
          },
        },
      } as unknown as ControllerContext;

      req.setBody({
        username: user.username,
        password: user.password,
      });

      const userController = new UserController(ctx);

      await userController.signUp(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('signIn', () => {
    it('should sign in user with success', async () => {
      const token = chance.string();
      const ctx = {
        container: {
          userService: {
            signIn: jest.fn().mockResolvedValue(token),
          },
        },
      } as unknown as ControllerContext;

      req.setBody({
        username: user.username,
        password: user.password,
      });

      const userController = new UserController(ctx);

      await userController.signIn(req, res, next);

      expect(ctx.container.userService.signIn).toHaveBeenCalledWith({
        username: user.username,
        password: user.password,
      });
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    });

    it('should throw an error to find all rooms', async () => {
      const ctx = {
        container: {
          userService: {
            signIn: jest.fn(() => {
              throw new Error();
            }),
          },
        },
      } as unknown as ControllerContext;

      req.setBody({
        username: user.username,
        password: user.password,
      });

      const userController = new UserController(ctx);

      await userController.signIn(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
