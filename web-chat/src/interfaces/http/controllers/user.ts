import { Router, Request, Response, NextFunction } from 'express';

import { ControllerContext, IController } from '../../../types/interface';
import { IUserService } from '../../../types/user';

export default class UserController implements IController {
  private userService: IUserService;

  constructor(context: ControllerContext) {
    this.userService = context.container.userService;
  }

  register(router: Router): void {
    router
      .route('/users')
      .post(this.signUp.bind(this));
  }

  async signUp(request: Request, response: Response, next: NextFunction) {
    try {
      const { username, password } = request.body;
      const user = await this.userService.signUp({ username, password });

      return response.status(201).send({
        message: 'User successfully registered',
        data: user,
      });
    } catch(err) {
      next(err);
    }
  }
}
