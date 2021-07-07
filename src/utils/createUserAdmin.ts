import { getConnection } from 'typeorm';
import UserEntity from '../entity/User';

const bcrypt = require('bcrypt');
const User = require('../resources/users/user.model');

export const createUserAdmin = async () => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash('admin', saltRounds);

  const connection = getConnection();
  const userRepo = connection.manager.getRepository(UserEntity);
  const newUser = new User({ name: 'admin', login: 'admin', password: passwordHash });
  await userRepo.save(newUser);
}