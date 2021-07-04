import 'reflect-metadata';
import { createConnection, QueryRunner } from 'typeorm';
import UserEntity from './entity/User';
import { PORT } from './common/config';
import { app } from './app';
import Migration from './db/migration/1624976310240-trello';
const User = require('./resources/users/user.model');
const bcrypt = require('bcrypt');

const trelloMigration = new Migration();

createConnection().then(async (connection) => {

  const queryRunner: QueryRunner = connection.createQueryRunner();
  await queryRunner.connect();
  const tables = await queryRunner.getTables(['Columns', 'Boards', 'Users', 'Tasks']);

  if (!tables.length) {
    await trelloMigration.up(queryRunner);

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash('admin', saltRounds);

    const userRepo = connection.manager.getRepository(UserEntity);
    const newUser = new User({ name: 'admin', login: 'admin', password: passwordHash });
    await userRepo.save(newUser);
  }

  app.listen(PORT, () => {
    process.stdout.write(`App is running on http://localhost:${PORT}\n\n`);
  }
  );

});


