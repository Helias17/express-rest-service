import { IBoard } from './../../interfaces/IBoard';

const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');


/** Create board
 * @param {Object} boardInfo - data to update the board
 * @returns {Object} createdBoard - createdBoard board
*/
const createBoard = async (boardInfo: IBoard) => {
  const createdBoard = await boardsRepo.createBoard(boardInfo);
  return createdBoard;
};


/** Get all boards
 * @returns {array} boards - array of created boards
*/
const getAllBoards = async () => {
  const boards = await boardsRepo.getAllBoards();
  return boards;
}


/** Get board by id
 * @param {number} id - number of board
 * @returns {Object|null} found board or null 
*/
const getBoardById = async (id: number) => {
  const foundBoard = await boardsRepo.getBoardById(id);
  return foundBoard || null;
};


/** update board
 * @param {number} id - number of board
 * @param {boardInfo} boardInfo - data to update the board
 * @returns {Object} updated board
*/
const updateBoard = async (id: number, boardInfo: IBoard) => {
  const updatedBoard = await boardsRepo.updateBoard(id, boardInfo);
  return updatedBoard;
};


/** delete board
 * @param {number} id - number of board
 * @returns {boolean} true/false - if board was succesfully deleted, return true
*/
const deleteBoard = async (id: number) => {
  const isBoardDeleted = await boardsRepo.deleteBoard(id);
  if (isBoardDeleted) {
    await tasksService.deleteTasksByBoardId(id);
  }
  return isBoardDeleted;
};


module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard
};
