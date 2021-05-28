const Task = require('./task.model');

let tasks = [];

const createTask = async (task) => {
  const newTask = new Task(task);
  tasks.push(newTask);
  return newTask;
}

const getTasksByBoardId = async (id) => tasks.filter( task => task.boardId === id);

const getTaskByBoardIdTaskId = async (boardId, taskId) => tasks.find( 
  task => (task.boardId === boardId && task.id === taskId)
)

const updateTask = async (boardId, taskId, taskInfo) => {
  const updateTaskIndex = tasks.findIndex( task => (task.boardId === boardId && task.id === taskId) );

  if (updateTaskIndex >= 0) {
    tasks[updateTaskIndex] = {...tasks[updateTaskIndex], ...taskInfo};
    return tasks[updateTaskIndex];
  }
  
  return null;
}


const deleteTask = async (boardId, taskId) => {
  let isTaskDeleted = false;
  tasks = tasks.filter( task => {
    if (task.id === taskId && task.boardId === boardId ) {
      isTaskDeleted = true;
      return false;
    }

    return true;
  } );

  return isTaskDeleted;
}

const deleteTasksByBoardId = async (boardId) => {

  let isTasksDeleted = false;
  tasks = tasks.filter( task => {
    if (task.boardId === boardId ) {
      isTasksDeleted = true;
      return false;
    }
    return true;
  } );

  return isTasksDeleted;
}

const updateTasksAfterUserDeleted = async (userId) => {
  tasks.forEach( task => {
    const taskObj = task;
    if (task.userId === userId) {
      taskObj.userId = null;
    }
  } );
}


module.exports = { 
  createTask,
  getTasksByBoardId,
  getTaskByBoardIdTaskId,
  updateTask,
  deleteTask,
  updateTasksAfterUserDeleted,
  deleteTasksByBoardId
};