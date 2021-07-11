import { getConnection, QueryRunner } from 'typeorm';
import Migration from '../db/migration/1624976310240-trello';
import { createUserAdmin } from './createUserAdmin';

export const createTables = async () => {
  const connection = getConnection();
  const queryRunner: QueryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  const tables = await queryRunner.getTables(['Columns', 'Boards', 'Users', 'Tasks']);

  if (!tables.length) {
    const trelloMigration = new Migration();
    await trelloMigration.up(queryRunner);
    await createUserAdmin();
  }
}
