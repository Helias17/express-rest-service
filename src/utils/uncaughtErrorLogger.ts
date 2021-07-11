import * as winston from 'winston';
import { winstonOptions } from '../common/winston.config';

export const uncaughtErrorLogger = winston.createLogger(winstonOptions);

