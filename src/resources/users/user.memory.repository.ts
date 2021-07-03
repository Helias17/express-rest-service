import { getRepository } from 'typeorm';
import { IUser } from './../../interfaces/IUser';
import UserEntity from '../../entity/User';
const bcrypt = require('bcrypt');
const User = require('./user.model');
const tasksRepo = require('../tasks/task.memory.repository');


const users: IUser[] = [];

/** get all users
 * @returns {array} return array of user's instances
*/
const getAllUsers = async () => {
  const userRepo = getRepository(UserEntity);

  const allUsers = await userRepo.find();
  return allUsers;
}


/** create user
 * @param {string} name - user's name
 * @param {string} login - user's login
 * @param {string} password - user's password
 * @returns {Object|undefined} return created user instance, if user was not found return undefined
*/
const createUser = async ({ name, login, password }: { name: string, login: string, password: string }) => {

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  password = passwordHash;

  const userRepo = getRepository(UserEntity);
  const newUser = new User({ name, login, password });
  await userRepo.save(newUser);
  return User.toResponse(newUser);
}


/** get user by id
 * @param {id} id - user's id
 * @returns {Object|undefined} return user instance, if user was not found return undefined
*/
const getUserById = async (id: string) => {
  const userRepo = getRepository(UserEntity);
  const foundUser = await userRepo.findOne({ 'id': id });
  return foundUser;
}


/** delete user
 * @param {id} id - user's id
 * @returns {boolean} return true, if user was succesfully deleted, else - return false
*/
const deleteUser = async (id: string) => {
  const userRepo = getRepository(UserEntity);
  let isUserDeleted = false;

  const foundUser = await userRepo.findOne({ 'id': id });

  if (foundUser) {
    await userRepo.remove(foundUser);
    isUserDeleted = true;
    await tasksRepo.updateTasksAfterUserDeleted(id);
  }

  return isUserDeleted;
}


/** update user info
 * @param {id} id - user's id
 * @param {userInfo} userInfo - data to update user
 * @returns {Object|null} return updated user or null, if user wasn't found
*/
const updateUser = async (id: string, userInfo: IUser) => {
  const saltRounds = 10;
  const passwordHash = await new Promise((resolve, reject) => {
    bcrypt.hash(userInfo.password, saltRounds, function (err: Error, hash: string) {
      if (err) reject(err);
      resolve(hash);
    });
  })

  const userRepo = getRepository(UserEntity);

  const foundUser = await userRepo.findOne({ 'id': id });

  if (foundUser) {
    foundUser.name = userInfo.name;
    foundUser.login = userInfo.login;
    foundUser.password = passwordHash as string;
    await userRepo.save(foundUser);
    return User.toResponse(foundUser);
  } else {
    return null;
  }
}


module.exports = {
  users,
  getUserById,
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
};