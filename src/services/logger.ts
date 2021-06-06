import { default as winston, format } from 'winston';
import path from 'path';
import { LOGS_FOLDER } from '../common/config';



export const logger = winston.createLogger({
  format: format.combine(
    format.json(),
    format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join('./', LOGS_FOLDER!, 'logInfo.txt'),
      level: 'info'
    }),
    Object.assign(
      new winston.transports.File({
        filename: path.join('./', LOGS_FOLDER!, 'logError.txt'),
        level: 'error',
        handleExceptions: true
      }), {
      handleRejections: true
    }),
  ]

});

