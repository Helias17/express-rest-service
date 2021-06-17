export default {
  type: "postgres",
  host: "localhost",
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: [
    "src/entity/**/*.ts"
  ],
  migrations: [
    "src/db/migration/*.ts"
  ],
  cli: {
    "migrationsDir": "src/db/migration"
  },
  seeds: [
    "src/db/seeds/*.ts"
  ],
  factories: [
    "src/db/factories/*.ts"
  ]
}