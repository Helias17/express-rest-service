import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const {
  PORT,
  NODE_ENV,
  JWT_SECRET_KEY,
  LOGS_FOLDER,
  USE_FASTIFY,
  AUTH_MODE,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT
} = process.env;
