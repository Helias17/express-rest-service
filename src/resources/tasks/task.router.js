const router = require('express').Router();
const tasksService = require('./task.service');



router.route('/:id/tasks').post(async (req, res) => {

  const createdTask = await tasksService.createTask(req.params.id, req.body);
  if (createdTask) {
    res.status(201).json(createdTask);
  } else {
    res.status(404).send('Bad request');
  }
});

router.route('/:id/tasks').get(async (req, res) => {
  const tasks = await tasksService.getTasksByBoardId(req.params.id);
  if (tasks.length) {
    res.status(200).json(tasks);
  } else {
    res.status(404).send('Tasks not found');
  }
});


/* 

router.route('/').get(async (req, res) => {
  const users = await usersService.getAllUsers();
  res.json(users);
});


router.route('/:id').delete(async (req, res) => {
  const isUserDeleted = await usersService.deleteUser(req.params.id);
  if (isUserDeleted) {
    res.status(204).send('The user has been deleted');
  } else {
    res.status(404).send('User not found');
  }
});

router.route('/:id').put(async (req, res) => {
  const {id} = req.params;
  const userInfo  = req.body;
  console.log(id);
  console.log(userInfo);

  const updatedUser = await usersService.updateUser(id, userInfo);
  if (updatedUser) {
    console.log(updatedUser);
    res.status(200).json(updatedUser);
  } else {
    res.status(400).send('Bad request');
  }
});

 */

module.exports = router;
