import { Request, Response, NextFunction, } from 'express';
import { handleError } from '../services/errors/handleError';
import { ErrorHandler } from '../services/errors/ErrorHandler';
import { logger } from '../services/logger';

export const errorsMiddleware = (
  err: ErrorHandler,
  _req: Request,
  res: Response,
  _next: NextFunction): void => {
  handleError(err, res);

  const logErr = {
    level: 'error',
    ...err
  }

  logger.log(logErr);
}