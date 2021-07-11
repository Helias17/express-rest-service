import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JWT_SECRET_KEY } from '../common/config';


export const authVerify = (req: Request): boolean => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.split(' ').length > 1) {
    const bearer = authHeader.split(' ');
    const bearerToken: string = bearer[1]!;

    jwt.verify(bearerToken, JWT_SECRET_KEY!, (err) => {
      if (err) {
        throw new HttpException(err.message, HttpStatus.FORBIDDEN);
      }
    });
  } else {
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  return true;
}
