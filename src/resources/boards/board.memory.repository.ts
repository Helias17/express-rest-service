import { getRepository } from 'typeorm';
import { IColumn } from './../../interfaces/IColumn';
import { BoardEntity } from '../../entity/Board';
const Board = require('./board.model');
const BoardColumn = require('./boardColumn.model');
const tasksRepo = require('../tasks/task.memory.repository');


/** Create board in database 
 * @param {string} title - The title of the board.
 * @param {array} columns - columns of the board
 * @returns {Object} newBoard - created board instance
*/
const createBoard = async ({ title, columns }: { title: string, columns: IColumn[] }) => {

  const boardRepo = getRepository(BoardEntity);

  const columnsWithId = columns.map(column => new BoardColumn(column));
  const newBoard = new Board({ title, columnsWithId });
  await boardRepo.save(newBoard);

  return newBoard;
}


/** get all boards 
 * @returns {array} boards - array of boards
*/
const getAllBoards = async () => {
  const boardRepo = getRepository(BoardEntity);
  const allBoards = await boardRepo.find({ relations: ["columns"] })
  return allBoards;
}


/** Get board by id
 * @param {number} id - The ID of the board
 * @returns {Object} board - found board
*/
const getBoardById = async (id: string) => {
  const boardRepo = getRepository(BoardEntity);
  const foundBoard = await boardRepo.findOne(id);
  return foundBoard;
}


/** Update board information
 * @param {number} id - The ID of the board
 * @returns {Object} boardInfo - data to update the board
*/
const updateBoard = async (id: string, boardInfo: BoardEntity) => {

  const boardRepo = getRepository(BoardEntity);
  const foundBoard = await boardRepo.findOne({ relations: ["columns"], where: { 'id': id } });

  if (foundBoard) {
    foundBoard.title = boardInfo.title;
    foundBoard.columns = boardInfo.columns!;
    await boardRepo.save(foundBoard);
    return foundBoard;
  }
  return null;
}


/** Delete board
 * @param {number} id - The ID of the board
 * @returns {boolean} boolean - if boards was deleted return true
*/
const deleteBoard = async (id: string) => {
  let isBoardDeleted = false;

  const boardRepo = getRepository(BoardEntity);
  const foundBoard = await boardRepo.findOne({ relations: ["columns"], where: { 'id': id } });
  if (foundBoard) {
    await boardRepo.remove(foundBoard);
    await tasksRepo.deleteTasksByBoardId(id);
    isBoardDeleted = true;
  }

  return isBoardDeleted;
}


module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard
};

