const boards = [];
const Board = require('./board.model');
const BoardColumn = require('./boardColumn.model');


const createBoard = async ({title, columns}) => {
  const columnsWithId = columns.map( column => new BoardColumn(column))
  const newBoard = new Board({title, columnsWithId});
  boards.push(newBoard);
  return newBoard;
}

/* 
const getAllUsers = async () => users.map(User.toResponse);


const getUserById = async (id) => users.find( user => user.id === id)

const deleteUser = async (id) => {
  let isUserDeleted = false;
  users = users.filter( user => {
    if (user.id !== id) {
      return true;
    }
    isUserDeleted = true;
    return false;
  } );

  return isUserDeleted;
}

const updateUser = async (id, userInfo) => {
  const userArrIndex = users.findIndex( item => item.id === id );
  if (userArrIndex >= 0) {
    users[userArrIndex].name = userInfo.name;
    users[userArrIndex].login = userInfo.login;
    users[userArrIndex].password = userInfo.password;
    return User.toResponse(users[userArrIndex]);
  }    
  return null;
}

 */

module.exports = { 
  createBoard,
};