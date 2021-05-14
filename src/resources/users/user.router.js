const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users);
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getUserById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('Not found');
  }
});

router.route('/').post(async (req, res) => {
  const createdUser = await usersService.createUser(req.body);
  res.status(201).json(createdUser);
});

module.exports = router;
