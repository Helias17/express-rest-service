import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import YAML from 'yamljs';
import path from 'path';
import { AppModule } from './app.module';
import { PORT } from './common/config';
import { createTables } from './utils/createTables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await createTables();

  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(PORT!);
}
bootstrap();
