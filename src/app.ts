import { default as express, Response, Request, NextFunction } from 'express';
import { createConnection } from 'typeorm';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import cors from 'cors';
import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/board.router';
import { taskRouter } from './resources/tasks/task.router';
import { logRequest } from './middleware/logRequest';
import { logger } from './services/logger';
import { errorsMiddleware } from './middleware/errorsMiddleware';

createConnection();

export const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logRequest);
app.use(cors());

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running fast!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use(errorsMiddleware);

process.on('uncaughtException', (err: Error) => {
  logger.log({ level: 'error', message: err.message, description: 'uncaught exception' });
});


process.on('unhandledRejection', (err: Error) => {
  logger.log({ level: 'error', message: err.message, description: 'unhandled rejection' });
})

//  throw new Error('Oops! uncaught Exception!');  

//Promise.reject(new Error('Oops! unhandledRejection!'));

