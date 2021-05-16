const boardsRepo = require('./board.memory.repository');
// const Board = require('./board.model');


const createBoard = async (boardInfo) => {
  const createdBoard = await boardsRepo.createBoard(boardInfo);
  return createdBoard;
};


const getAllBoards = async () => {
  const boards = await boardsRepo.getAllBoards();
  return boards;
}


const getBoardById = async (id) => {
  const foundBoard = await boardsRepo.getBoardById(id);
  return foundBoard || null;
};

const updateBoard = async (id, boardInfo) => {
  const updatedBoard = await boardsRepo.updateBoard(id, boardInfo);
  return updatedBoard;
};


const deleteBoard = async (id) => {
  const isBoardDeleted = await boardsRepo.deleteBoard(id);
  return isBoardDeleted;
};




module.exports = { 
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard
 };
