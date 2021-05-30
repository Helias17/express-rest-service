import { Request, Response } from 'express';
import { IUser } from "../../interfaces/IUser";

const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (_req: Request, res: Response) => {
  const users: IUser[] = await usersService.getAllUsers();
  res.json(users);
});

router.route('/:id').get(async (req: Request, res: Response) => {
  const user = await usersService.getUserById(req.params['id']);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('Not found');
  }
});

router.route('/').post(async (req: Request, res: Response) => {
  const createdUser = await usersService.createUser(req.body);
  res.status(201).json(createdUser);
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  const isUserDeleted = await usersService.deleteUser(req.params['id']);
  if (isUserDeleted) {
    res.status(204).send('User deleted');
  } else {
    res.status(404).send('User not found');
  }
});

router.route('/:id').put(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userInfo = req.body;

  const updatedUser = await usersService.updateUser(id, userInfo);
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    res.status(400).send('Bad request');
  }
});

export { router as userRouter };
