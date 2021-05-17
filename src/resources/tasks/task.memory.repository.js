const Task = require('./task.model');

const tasks = [];

const createTask = async (task) => {
  const newTask = new Task(task);
  tasks.push(newTask);
  return newTask;
}

const getTasksByBoardId = async (id) => tasks.filter( task => task.boardId === id)

/* 
const getAllUsers = async () => users.map(User.toResponse);




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
  createTask,
  getTasksByBoardId,
};