const Task = require('./task.model');

let tasks = [];

/** Create task
 * @param {Object} task - task info
 * @returns {Object} newTask - created task
*/
const createTask = async (task) => {
  const newTask = new Task(task);
  tasks.push(newTask);
  return newTask;
}


/** get tasks by board id
 * @param {number} id - board's id
 * @returns {array} array of found tasks
*/
const getTasksByBoardId = async (id) => tasks.filter( task => task.boardId === id);


/** get task by board id and task id
 * @param {number} boardId - board's id
 * @param {number} taskId - task's id
 * @returns {Object} found task
*/
const getTaskByBoardIdTaskId = async (boardId, taskId) => tasks.find( 
  task => (task.boardId === boardId && task.id === taskId)
)


/** update task info by task id and board id
 * @param {number} boardId - board's id
 * @param {number} taskId - task's id
 * @param {Object} taskInfo - data to update task
 * @returns {Object} tasks[updateTaskIndex] - updated task
*/
const updateTask = async (boardId, taskId, taskInfo) => {
  const updateTaskIndex = tasks.findIndex( task => (task.boardId === boardId && task.id === taskId) );

  if (updateTaskIndex >= 0) {
    tasks[updateTaskIndex] = {...tasks[updateTaskIndex], ...taskInfo};
    return tasks[updateTaskIndex];
  }
  
  return null;
}


/** delete task by task id and board id
 * @param {number} boardId - board's id
 * @param {number} taskId - task's id
 * @returns {boolean} if task was succesfully deleted, return true, else - false
*/
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


/** delete tasks by board id
 * @param {number} boardId - board's id
 * @returns {boolean} if tasks were succesfully deleted, return true, else - false
*/
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


/** update tasks after user was deleted
 * @param {number} userId - user's id
*/
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