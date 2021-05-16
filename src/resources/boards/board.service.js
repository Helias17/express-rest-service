const boardsRepo = require('./board.memory.repository');
// const Board = require('./board.model');


const createBoard = async (boardInfo) => {
  const createdBoard = await boardsRepo.createBoard(boardInfo);
  return createdBoard;
};

/* 
const getAllUsers = async () => {
  const users = await usersRepo.getAllUsers();
  return users;
}

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
 */

module.exports = { 
  createBoard,
 };
