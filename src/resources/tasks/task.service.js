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

/* 
const getAllUsers = async () => {
  const users = await usersRepo.getAllUsers();
  return users;
}



const deleteUser = async (id) => {
  const isUserDeleted = await usersRepo.deleteUser(id);
  return isUserDeleted;
};

const updateUser = async (id, userInfo) => {
  const updatedUser = await usersRepo.updateUser(id, userInfo);
  return updatedUser;
};

 */
module.exports = { 
  createTask,
  getTasksByBoardId,
 };
