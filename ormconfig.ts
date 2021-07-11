import { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } from './src/common/config';

export default {
  type: "postgres",
  host: "localhost", // host.docker.internal
  port: POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [
    "src/entity/**/*.ts"
  ],
  migrations: [
    "src/db/migration/*.ts"
  ],
  cli: {
    "migrationsDir": "src/db/migration",
    "entitiesDir": 'src/entity',
  },
  seeds: [
    "src/db/seeds/*.ts"
  ],
  factories: [
    "src/db/factories/*.ts"
  ]
}