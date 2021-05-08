import { Router, Request, Response, NextFunction } from 'express';

import { ControllerContext, IController } from '../../../types/controller';
import { IUserService } from '../../../types/user';

export default class UserController implements IController {
  private userService: IUserService;

  constructor(container: ControllerContext) {
    this.userService = container.userService;
  }

  register(router: Router): void {
    router
      .route('/users')
      .post(this.singUp.bind(this));
  }

  async singUp(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, password } = request.body;
      const user = await this.userService.singUp({ name, password });

      return response.status(201).send({
        message: 'User successfully registered',
        data: user,
      });
    } catch(err) {
      next(err);
    }
  }
}