const tasksRepo = require('./task.memory.repository');
// const Task = require('./task.model');


const createTask = async (id, task) => {
  const taskInfo  = {...task, boardId: id};
  const createdTask = await tasksRepo.createTask(taskInfo);
  return createdTask;
};

const getTasksByBoardId = async (id) => {
  const foundTasks = await tasksRepo.getTasksByBoardId(id);
  return foundTasks.length ? foundTasks : null;
};

const getTaskByBoardIdTaskId = async (boardId, taskId) => {
  const foundTask = await tasksRepo.getTaskByBoardIdTaskId(boardId, taskId);
  return foundTask || null;
};

const updateTask = async (boardId, taskId, taskInfo) => {
  const updatedTask = await tasksRepo.updateTask(boardId, taskId, taskInfo);
  return updatedTask;
};


const deleteTask = async (boardId, taskId) => {
  const isTaskDeleted = await tasksRepo.deleteTask(boardId, taskId);
  return isTaskDeleted || null;
};

const deleteTasksByBoardId = async (boardId) => {
  const isTasksDeleted = await tasksRepo.deleteTasksByBoardId(boardId);
  return isTasksDeleted || null;
};

const updateTasksAfterUserDeleted = async (userId) => {
  await tasksRepo.updateTasksAfterUserDeleted(userId);
};


module.exports = { 
  createTask,
  getTasksByBoardId,
  getTaskByBoardIdTaskId,
  updateTask,
  deleteTask,
  updateTasksAfterUserDeleted,
  deleteTasksByBoardId
 };
