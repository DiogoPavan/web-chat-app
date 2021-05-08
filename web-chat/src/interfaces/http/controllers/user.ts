import { Router, Request, Response, NextFunction } from 'express';

import { ControllerContext, IController } from '../../../types/interface';

export class UserController implements IController {
  private userService: ControllerContext['container']['userService'];

  constructor({ container }: ControllerContext) {
    this.userService = container.userService;
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
