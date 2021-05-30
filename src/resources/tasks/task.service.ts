import { ITask } from '../../interfaces/ITask';
const tasksRepo = require('./task.memory.repository');


/** Create task
 * @param {Object} task - task info
 * @returns {Object} createdTask - created task
*/
const createTask = async (id: string, task: ITask) => {
  const taskInfo = { ...task, boardId: id };
  const createdTask = await tasksRepo.createTask(taskInfo);
  return createdTask;
};


/** get tasks by board id
 * @param {number} id - board's id
 * @returns {array|null} array of found tasks or null
*/
const getTasksByBoardId = async (id: string) => {
  const foundTasks = await tasksRepo.getTasksByBoardId(id);
  return foundTasks.length ? foundTasks : null;
};


/** get task by board id and task id
 * @param {number} boardId - board's id
 * @param {number} taskId - task's id
 * @returns {Object|null} found task or null
*/
const getTaskByBoardIdTaskId = async (boardId: string, taskId: string) => {
  const foundTask = await tasksRepo.getTaskByBoardIdTaskId(boardId, taskId);
  return foundTask || null;
};


/** update task info by task id and board id
 * @param {number} boardId - board's id
 * @param {number} taskId - task's id
 * @param {Object} taskInfo - data to update task
 * @returns {Object} updatedTask - updated task
*/
const updateTask = async (boardId: string, taskId: string, taskInfo: ITask) => {
  const updatedTask = await tasksRepo.updateTask(boardId, taskId, taskInfo);
  return updatedTask;
};


/** delete task by task id and board id
 * @param {number} boardId - board's id
 * @param {number} taskId - task's id
 * @returns {boolean} if task was succesfully deleted, return true, else - null
*/
const deleteTask = async (boardId: string, taskId: string) => {
  const isTaskDeleted = await tasksRepo.deleteTask(boardId, taskId);
  return isTaskDeleted || null;
};


/** delete tasks by board id
 * @param {number} boardId - board's id
 * @returns {boolean} if tasks were succesfully deleted, return true, else - false
*/
const deleteTasksByBoardId = async (boardId: string) => {
  const isTasksDeleted = await tasksRepo.deleteTasksByBoardId(boardId);
  return isTasksDeleted;
};


/** update tasks after user was deleted
 * @param {number} userId - user's id
*/
const updateTasksAfterUserDeleted = async (userId: string) => {
  await tasksRepo.updateTasksAfterUserDeleted(userId);
};

/* 
module.exports = {
  createTask,
  getTasksByBoardId,
  getTaskByBoardIdTaskId,
  updateTask,
  deleteTask,
  updateTasksAfterUserDeleted,
  deleteTasksByBoardId
};
 */

export {
  createTask,
  getTasksByBoardId,
  getTaskByBoardIdTaskId,
  updateTask,
  deleteTask,
  updateTasksAfterUserDeleted,
  deleteTasksByBoardId
}