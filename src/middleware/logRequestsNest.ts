import { Injectable, NestMiddleware, Inject, LoggerService } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { isEmptyObject } from '../utils/isEmptyObject';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) { }

  use(req: Request, res: Response, next: NextFunction) {

    const date = new Date();
    const logDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

    const method = req.method;
    const url = req.url;
    const body = isEmptyObject(req, 'body') ? '' : req.body;
    const params = isEmptyObject(req, 'params') ? '' : req.params;
    const query = isEmptyObject(req, 'query') ? '' : req.query;

    res.on('finish', () => {
      const status = res.statusCode;

      this.logger.log(
        {
          level: 'info',
          message: res.statusMessage,
          Date: logDate,
          URL: url,
          Method: method,
          Body: body,
          Params: params,
          Query: query,
          Status: status + ' (response)'
        }
      );
    });

    next();
  }
}
