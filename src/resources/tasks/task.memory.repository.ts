import { getRepository } from 'typeorm';
import { ITask } from '../../interfaces/ITask';
import TaskEntity from '../../entity/Task';
const Task = require('./task.model');


/** Create task
 * @param {Object} task - task info
 * @returns {Object} newTask - created task
*/
const createTask = async (task: ITask) => {
  const taskRepo = getRepository(TaskEntity);
  const newTask = new Task(task);
  await taskRepo.save(newTask);
  return newTask;
}


/** get tasks by board id
 * @param {number} id - board's id
 * @returns {array} array of found tasks
*/
const getTasksByBoardId = async (id: string) => {
  const taskRepo = getRepository(TaskEntity);
  const foundTasks = await taskRepo.find({ boardId: id });
  return foundTasks;
}


/** get task by board id and task id
 * @param {number} boardId - board's id
 * @param {number} taskId - task's id
 * @returns {Object} found task
*/
const getTaskByBoardIdTaskId = async (boardId: string, taskId: string) => {
  const taskRepo = getRepository(TaskEntity);
  const foundTask = await taskRepo.findOne({ 'boardId': boardId, id: taskId });
  return foundTask;
}


/** update task info by task id and board id
 * @param {number} boardId - board's id
 * @param {number} taskId - task's id
 * @param {Object} taskInfo - data to update task
 * @returns {Object} tasks[updateTaskIndex] - updated task
*/
const updateTask = async (boardId: string, taskId: string, taskInfo: ITask) => {
  const taskRepo = getRepository(TaskEntity);
  const foundTask = await taskRepo.findOne({ 'boardId': boardId, id: taskId });

  if (foundTask) {
    foundTask.title = taskInfo.title;
    foundTask.order = taskInfo.order;
    foundTask.description = taskInfo.description;
    foundTask.userId = taskInfo.userId!;
    foundTask.boardId = taskInfo.boardId!;
    foundTask.columnId = taskInfo.columnId!;
    await taskRepo.save(foundTask);
    return foundTask;
  }

  return null;
}


/** delete task by task id and board id
 * @param {number} boardId - board's id
 * @param {number} taskId - task's id
 * @returns {boolean} if task was succesfully deleted, return true, else - false
*/
const deleteTask = async (boardId: string, taskId: string) => {
  let isTaskDeleted = false;

  const taskRepo = getRepository(TaskEntity);
  const foundTask = await taskRepo.findOne({ 'boardId': boardId, id: taskId });

  if (foundTask) {
    await taskRepo.remove(foundTask);
    isTaskDeleted = true;
  }

  return isTaskDeleted;
}


/** delete tasks by board id
 * @param {number} boardId - board's id
 * @returns {boolean} if tasks were succesfully deleted, return true, else - false
*/
const deleteTasksByBoardId = async (boardId: string) => {

  let isTasksDeleted = false;

  const taskRepo = getRepository(TaskEntity);
  const foundTasks = await taskRepo.find({ 'boardId': boardId });

  if (foundTasks.length) {
    const taskPromisesArr = foundTasks.map(async (task) => {
      return await taskRepo.remove(task);
    })
    await Promise.all(taskPromisesArr);
    isTasksDeleted = true;
  }
  return isTasksDeleted;
}


/** update tasks after user was deleted
 * @param {number} userId - user's id
*/
const updateTasksAfterUserDeleted = async (userId: string) => {

  const taskRepo = getRepository(TaskEntity);
  const foundTasks = await taskRepo.find({ 'userId': userId });

  if (foundTasks.length) {
    const taskPromisesArr = foundTasks.map(async (task) => {
      task.userId = null!;
      return await taskRepo.save(task);
    })
    await Promise.all(taskPromisesArr);
  }


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