import { Request, Response, NextFunction } from 'express';

import { HttpStatus } from '../../../types/enum';
import { BadRequest } from '../../../utils/errors';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  let status = HttpStatus.INTERNAL_SERVER_ERROR;

  if (err instanceof BadRequest) {
    status = HttpStatus.BAD_REQUEST;
  }

  return res
    .status(status)
    .send({
      code: err.code,
      message: err.message,
      details: err.details,
    });
};
