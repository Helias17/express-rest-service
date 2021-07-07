import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/config';
import { createTables } from './utils/createTables';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await createTables();
  await app.listen(PORT!);
}
bootstrap();
