import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'joi';
import { BadRequest } from '../../../utils/errors';

const validation = (schema: AnySchema) => (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  const validate = schema.validate(req, {
    abortEarly: false,
    stripUnknown: true,
    allowUnknown: true,
  });

  if (validate.error) {
    return next(new BadRequest('Invalid params', validate.error.details));
  }

  Object.assign(req, validate.value);

  return next();
};

export {
  validation,
};
