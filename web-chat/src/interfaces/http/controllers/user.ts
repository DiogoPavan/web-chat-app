import { Router, Request, Response, NextFunction } from 'express';

import { ControllerContext, IController } from '../../../types/interface';
import { HttpStatus } from '../../../types/enum';

export class UserController implements IController {
  private userService: ControllerContext['container']['userService'];

  constructor({ container }: ControllerContext) {
    this.userService = container.userService;
  }

  register(router: Router): void {
    router
      .route('/users')
      .post(this.signUp.bind(this));

    router
      .route('/users/signIn')
      .post(this.signIn.bind(this));
  }

  async signUp(request: Request, response: Response, next: NextFunction) {
    try {
      const { username, password } = request.body;
      const user = await this.userService.signUp({ username, password });

      return response.status(HttpStatus.CREATED).send({
        message: 'User successfully registered',
        data: user,
      });
    } catch(err) {
      next(err);
    }
  }

  async signIn(request: Request, response: Response, next: NextFunction) {
    try {
      const { username, password } = request.body;
      const token = await this.userService.signIn({ username, password });

      return response.status(HttpStatus.OK).send({
        message: 'User successfully authenticated',
        data: {
          token,
        },
      });
    } catch(err) {
      next(err);
    }
  }
}
