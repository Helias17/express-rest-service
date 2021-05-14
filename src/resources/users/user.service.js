const usersRepo = require('./user.memory.repository');
const User = require('./user.model');

const getAllUsers = async () => {
  const users = await usersRepo.getAllUsers();
  return users;
}

const createUser = async (name, login, password) => {
  const createdUser = await usersRepo.createUser(name, login, password);
  return createdUser;
};

const getUserById = async (id) => {
  const foundUser = await usersRepo.getUserById(id);
  return foundUser ? User.toResponse(foundUser) : null;
};

const deleteUser = async (id) => {
  const isUserDeleted = await usersRepo.deleteUser(id);
  return isUserDeleted;
};

const updateUser = async (id, userInfo) => {
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
