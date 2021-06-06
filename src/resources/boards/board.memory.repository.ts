import { IColumn } from './../../interfaces/IColumn';
import { IBoard } from './../../interfaces/IBoard';
const Board = require('./board.model');
const BoardColumn = require('./boardColumn.model');

let boards: IBoard[] = [];


/** Create board in database 
 * @param {string} title - The title of the board.
 * @param {array} columns - columns of the board
 * @returns {Object} newBoard - created board instance
*/
const createBoard = async ({ title, columns }: { title: string, columns: IColumn[] }) => {
  const columnsWithId = columns.map(column => new BoardColumn(column));
  const newBoard = new Board({ title, columnsWithId });
  boards.push(newBoard);
  return newBoard;
}


/** get all boards 
 * @returns {array} boards - array of boards
*/
const getAllBoards = async () => boards;


/** Get board by id
 * @param {number} id - The ID of the board
 * @returns {Object} board - found board
*/
const getBoardById = async (id: string) => boards.find(board => board.id === id)


/** Update board information
 * @param {number} id - The ID of the board
 * @returns {Object} boardInfo - data to update the board
*/
const updateBoard = async (id: string, boardInfo: IBoard) => {

  const updateColumns = (board: IBoard, columnsUpdateArr: IColumn[]) => {
    columnsUpdateArr.forEach(column => {
      if (!board.columns || board.columns.length === 0) {
        return;
      }

      const columnForUpdate = board.columns.find(columnOld => columnOld.id === column.id);

      if (typeof columnForUpdate === 'object') {
        columnForUpdate!.title = column.title;
        columnForUpdate!.order = column.order;
      }
    })
  }

  const boardArrIndex = boards.findIndex(item => item.id === id);

  if (typeof boards[boardArrIndex] !== 'object' || !boardInfo.columns || boardInfo.columns.length === 0) {
    return null;
  } else {
    boards[boardArrIndex]!.title = boardInfo.title;
    updateColumns(boards[boardArrIndex]!, boardInfo.columns!);
    return boards[boardArrIndex];
  }
}


/** Delete board
 * @param {number} id - The ID of the board
 * @returns {boolean} boolean - if boards was deleted return true
*/
const deleteBoard = async (id: string) => {
  const boardIndex = boards.findIndex(board => board.id === id);
  if (boardIndex < 0) return false;

  let isBoardDeleted = false;
  boards = boards.filter(board => {

    if (board.id === id) {
      isBoardDeleted = true;
      return false;
    }

    return true;
  });

  return isBoardDeleted;
}


module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard
};

