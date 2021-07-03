import { Request, Response, Router, NextFunction } from 'express';
import * as boardsService from './board.service';
import { ErrorHandler } from '../../services/errors/ErrorHandler';
import { authVerify } from '../../middleware/authVerify';

const router = Router();

router.route('/').post(authVerify, async (req: Request, res: Response) => {
  const board = await boardsService.createBoard(req.body);
  res.status(201).json(board);
});

router.route('/').get(authVerify, async (_req: Request, res: Response) => {
  const boards = await boardsService.getAllBoards();
  res.status(200).json(boards);
});

router.route('/:id').get(authVerify, async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params['id']) {
    const err = new ErrorHandler(404, `Wrong ID`);
    next(err);
  }
  const board = await boardsService.getBoardById(req.params['id']!);
  if (board) {
    res.status(200).json(board);
  } else {
    const err = new ErrorHandler(404, `Board not found`);
    next(err);
  }
});

router.route('/:id').put(authVerify, async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params['id']) {
    const err = new ErrorHandler(404, `Wrong ID`);
    next(err);
  }
  const board = await boardsService.updateBoard(req.params['id']!, req.body);
  if (board) {
    res.status(200).json(board);
  } else {
    const err = new ErrorHandler(400, 'Bad request');
    next(err);
  }

});

router.route('/:id').delete(authVerify, async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params['id']) {
    const err = new ErrorHandler(404, 'Wrong ID');
    next(err);
  }
  const isBoardDeleted = await boardsService.deleteBoard(req.params['id']!);
  if (isBoardDeleted) {
    res.status(204).send('The board has been deleted');
  } else {
    const err = new ErrorHandler(404, 'Board not found');
    next(err);
  }

});

export { router as boardRouter };
