import { NextFunction, Request, Response } from 'express';
import { isEmptyObject } from '../services/isEmptyObject';
import { default as winston, format } from 'winston';



const logger = winston.createLogger({
  format: format.combine(
    format.json(),
    format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

const createLog = (req: Request, res: Response): void => {
  const date = new Date();
  const logDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

  const method = req.method;
  const url = req.url;
  const status = res.statusCode;
  const body = isEmptyObject(req, 'body') ? '' : req.body;
  const params = isEmptyObject(req, 'params') ? '' : req.params;
  const query = isEmptyObject(req, 'query') ? '' : req.query;


  logger.log({
    level: 'info',
    message: 'Request properties and response status',
    Date: logDate,
    URL: req.baseUrl + url,
    Method: method,
    Body: body,
    Params: params,
    Query: query,
    Status: status + ' (response)'
  });

}

export const logRequest = (req: Request, res: Response, next: NextFunction): void => {

  res.on('finish', () => {
    createLog(req, res);
  });

  next();
}