import { IUser } from "../../interfaces/IUser";
import * as tasksService from '../tasks/task.service';
const usersRepo = require('./user.memory.repository');
const User = require('./user.model');



/** get all users
 * @returns {Promise<array>} return array of user's instances
*/

const getAllUsers = async () => {
  const users = await usersRepo.getAllUsers();
  return users;
}


/** create user
 * @param {string} name - user's name
 * @param {string} login - user's login
 * @param {string} password - user's password
 * @returns {Object|undefined} return created user instance, if user was not found return undefined
*/
const createUser = async (name: string, login: string, password: string) => {
  const createdUser = await usersRepo.createUser(name, login, password);
  return createdUser;
};


/** get user by id
 * @param {id} id - user's id
 * @returns {Object|null} return user instance, if user was not found return null
*/
const getUserById = async (id: number) => {
  const foundUser = await usersRepo.getUserById(id);
  return foundUser ? User.toResponse(foundUser) : null;
};


/** delete user
 * @param {id} id - user's id
 * @returns {boolean} return true, if user was succesfully deleted, else - return false
*/
const deleteUser = async (id: string) => {
  const isUserDeleted = await usersRepo.deleteUser(id);

  if (isUserDeleted) {
    await tasksService.updateTasksAfterUserDeleted(id);
  }
  return isUserDeleted;
};


/** update user info
 * @param {id} id - user's id
 * @param {userInfo} userInfo - data to update user
 * @returns {Object|null} updatedUser - return updated user or null, if user wasn't found
*/
const updateUser = async (id: number, userInfo: IUser) => {
  const updatedUser = await usersRepo.updateUser(id, userInfo);
  return updatedUser;
};


module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser,
};
