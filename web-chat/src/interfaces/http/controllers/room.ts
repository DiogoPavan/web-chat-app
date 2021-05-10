import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import { HttpStatus } from '../../../types/enum';

import { ControllerContext, IController } from '../../../types/interface';

export class RoomController implements IController {
  private roomService: ControllerContext['container']['roomService'];

  constructor({ container }: ControllerContext) {
    this.roomService = container.roomService;
  }

  register(router: Router): void {
    router
      .route('/rooms')
      .get(this.findAll.bind(this));
  }

  async findAll(_: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const rooms = await this.roomService.findAll();

      response.status(HttpStatus.OK).send({
        data: rooms,
      });
    } catch (err) {
      next(err);
    }
  }
}
