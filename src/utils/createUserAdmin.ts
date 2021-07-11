import { getConnection } from 'typeorm';
import UserEntity from '../entity/User';
import { User } from '../modules/users/users.model';

const bcrypt = require('bcrypt');

export const createUserAdmin = async () => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash('admin', saltRounds);

  const connection = getConnection();
  const userRepo = connection.manager.getRepository(UserEntity);
  const newUser = new User({ name: 'admin', login: 'admin', password: passwordHash });
  await userRepo.save(newUser);
}