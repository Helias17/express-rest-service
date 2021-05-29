const Board = require('./board.model');
const BoardColumn = require('./boardColumn.model');

let boards = [];


/** Create board in database 
 * @param {string} title - The title of the board.
 * @param {array} columns - columns of the board
 * @returns {Object} newBoard - created board instance
*/
const createBoard = async ({title, columns}) => {
  const columnsWithId = columns.map( column => new BoardColumn(column))
  const newBoard = new Board({title, columnsWithId});
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
const getBoardById = async (id) => boards.find( board => board.id === id)


/** Update board information
 * @param {number} id - The ID of the board
 * @returns {Object} boardInfo - data to update the board
*/
const updateBoard = async (id, boardInfo) => {

  const updateColumns = (board, columnsUpdateArr) => {
    columnsUpdateArr.forEach( column => {
      const columnForUpdate = board.columns.find( columnOld => columnOld.id === column.id);
      columnForUpdate.title = column.title;
      columnForUpdate.order = column.order;
    })
  }

  const boardArrIndex = boards.findIndex( item => item.id === id );
  if (boardArrIndex >= 0) {
    boards[boardArrIndex].title = boardInfo.title;
    updateColumns(boards[boardArrIndex], boardInfo.columns);
    return boards[boardArrIndex];
  }    
  return null;
}


/** Delete board
 * @param {number} id - The ID of the board
 * @returns {boolean} boolean - if boards was deleted return true
*/
const deleteBoard = async (id) => {
  const boardIndex = boards.findIndex(board => board.id === id);
  if (boardIndex < 0) return false;

  let isBoardDeleted = false;
  boards = boards.filter( board => {

    if (board.id === id) {
      isBoardDeleted = true;
      return false;
    }

    return true;
  } );

  return isBoardDeleted;
}

module.exports = { 
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoard,
  deleteBoard
};