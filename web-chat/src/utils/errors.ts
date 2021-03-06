/* eslint-disable max-classes-per-file */
class CustomError extends Error {
  code: string;
  details: CustomError[] | null;

  constructor(
    code: string,
    message: string | null = null,
    details: CustomError[] | null = null,
  ) {
    super(message || code);
    this.code = code;
    this.details = details;
  }
}

export class BadRequest extends CustomError {
  constructor(message: string, details: null | any[] = null) {
    super('BAD_REQUEST', message, details);
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string, details: CustomError[]) {
    super('INTERNAL_SERVER_ERROR', message, details);
  }
}
