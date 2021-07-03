import { ErrorHandler } from './../services/errors/ErrorHandler';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';

export const authVerify = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.split(' ').length > 1) {
    const bearer = authHeader.split(' ');
    const bearerToken: string = bearer[1]!;

    jwt.verify(bearerToken, JWT_SECRET_KEY!, (err) => {
      if (err) {
        const customErr = new ErrorHandler(403, err.message);
        next(customErr);
      } else {
        next();
      }
    });
  } else {
    const err = new ErrorHandler(401, 'Unauthorized');
    next(err);
  }
}
