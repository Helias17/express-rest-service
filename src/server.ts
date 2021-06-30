import 'reflect-metadata';
import { createConnection, QueryRunner } from 'typeorm';
import { PORT } from './common/config';
import { app } from './app';
import Migration from './db/migration/1624976310240-trello';

const trelloMigration = new Migration();

createConnection().then(async (connection) => {

  const queryRunner: QueryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  const tables = await queryRunner.getTables(['Columns', 'Boards', 'Users', 'Tasks'])

  if (!tables.length) {
    await trelloMigration.up(queryRunner);
  }

  app.listen(PORT, () => {
    process.stdout.write(`App is running on http://localhost:${PORT}\n\n`);
  }
  );

});


