import { Response } from 'express';
import { ErrorHandler } from '../../services/errors/ErrorHandler';

export const handleError = (err: ErrorHandler, res: Response): void => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};