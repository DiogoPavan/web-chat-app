import { Router } from 'express';
import { IUserService } from './user';

export type ControllerContext = {
  userService: IUserService;
};

export interface IController {
  register(r: Router): void;
}

