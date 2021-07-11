import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import YAML from 'yamljs';
import path from 'path';
import { AppModule } from './app.module';
import { PORT } from './common/config';
import { createTables } from './utils/createTables';
import { uncaughtErrorLogger } from './utils/uncaughtErrorLogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await createTables();

  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(PORT!);
}
bootstrap();


process.on('uncaughtException', (err: Error) => {
  uncaughtErrorLogger.error({ level: 'error', message: err.message, description: 'uncaught exception' });
});


process.on('unhandledRejection', (err: Error) => {
  uncaughtErrorLogger.error({ level: 'error', message: err.message, description: 'unhandled rejection' });
})


// throw new Error('Oops! uncaught Exception!');

// Promise.reject(new Error('Oops! unhandledRejection!'));
