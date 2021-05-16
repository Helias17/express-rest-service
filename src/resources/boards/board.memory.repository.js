const Board = require('./board.model');
const BoardColumn = require('./boardColumn.model');

let boards = [];

const createBoard = async ({title, columns}) => {
  const columnsWithId = columns.map( column => new BoardColumn(column))
  const newBoard = new Board({title, columnsWithId});
  boards.push(newBoard);
  return newBoard;
}


const getAllBoards = async () => boards;


const getBoardById = async (id) => boards.find( board => board.id === id)


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


const deleteBoard = async (id) => {
  let isBoardDeleted = false;
  boards = boards.filter( board => {
    if (board.id !== id) {
      return true;
    }
    isBoardDeleted = true;
    return false;
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