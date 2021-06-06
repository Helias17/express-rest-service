import { Request, Response, Router, NextFunction } from 'express';
import { IUser } from "../../interfaces/IUser";
import { ErrorHandler } from '../../services/errors/ErrorHandler';

const usersService = require('./user.service');

const router = Router();

router.route('/').get(async (_req: Request, res: Response) => {
  const users: IUser[] = await usersService.getAllUsers();
  res.json(users);
});

router.route('/:id').get(async (req: Request, res: Response, next: NextFunction) => {
  const user = await usersService.getUserById(req.params['id']);
  if (user) {
    res.status(200).json(user);
  } else {
    const err = new ErrorHandler(404, `User with id ${req.params['id']} wasn't found`);
    next(err);
  }
});

router.route('/').post(async (req: Request, res: Response, next: NextFunction) => {
  const createdUser = await usersService.createUser(req.body);
  if (createdUser) {
    res.status(201).json(createdUser);
  } else {
    const err = new ErrorHandler(400, `User wasn't created`);
    next(err);
  }
});

router.route('/:id').delete(async (req: Request, res: Response, next: NextFunction) => {
  const isUserDeleted = await usersService.deleteUser(req.params['id']);
  if (isUserDeleted) {
    res.status(204).send('User deleted');
  } else {
    const err = new ErrorHandler(404, `User wasn't found`);
    next(err);
  }
});

router.route('/:id').put(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userInfo = req.body;

  const updatedUser = await usersService.updateUser(id, userInfo);
  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    const err = new ErrorHandler(400, `Bad request`);
    next(err);
  }
});

export { router as userRouter };
