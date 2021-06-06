const nodemon = require('nodemon');
import { default as express, Response, Request, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import { userRouter } from './resources/users/user.router';
import { boardRouter } from './resources/boards/board.router';
import { taskRouter } from './resources/tasks/task.router';
import { logRequest } from './middleware/logRequest';
import { logger } from './services/logger'

export const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logRequest);

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

process.on('uncaughtException', (err: Error) => {

  const afterNodemonExit = () => {
    process.exit();
  }
  logger.log({ level: 'error', message: err.message, description: 'uncaught exception' });
  nodemon.once('exit', afterNodemonExit).emit('quit');
});



//throw Error('Oops!');


