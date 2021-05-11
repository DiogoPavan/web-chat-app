import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

import { ControllerContext, IController } from '../../../types/interface';
import { HttpStatus } from '../../../types/enum';
import { singUpSchema, singInSchema } from '../schemas/user';

export class UserController implements IController {
  private validator: ControllerContext['validator'];
  private userService: ControllerContext['container']['userService'];

  constructor({ container, validator }: ControllerContext) {
    this.validator = validator;
    this.userService = container.userService;
  }

  register(router: Router): void {
    router
      .route('/users')
      .post(
        this.validator(singUpSchema),
        this.signUp.bind(this),
      );

    router
      .route('/users/signIn')
      .post(
        this.validator(singInSchema),
        this.signIn.bind(this),
      );
  }

  async signUp(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = request.body;
      const user = await this.userService.signUp({ username, password });

      response.status(HttpStatus.CREATED).send({
        message: 'User successfully registered',
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async signIn(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { username, password } = request.body;
      const token = await this.userService.signIn({ username, password });

      response.status(HttpStatus.OK).send({
        message: 'User successfully authenticated',
        data: {
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}
