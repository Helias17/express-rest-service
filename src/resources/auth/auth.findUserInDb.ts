import { getRepository } from 'typeorm';
import UserEntity from '../../entity/User';
import { ErrorHandler } from '../../services/errors/ErrorHandler';

export const findUserInDb = async (userName: string): Promise<UserEntity> => {

  const userRepo = getRepository(UserEntity);
  const foundUser = await userRepo.findOne({ login: userName });

  if (foundUser) {
    return foundUser;
  } else {
    throw new ErrorHandler(403, 'User not found. Check login/password');
  }
}