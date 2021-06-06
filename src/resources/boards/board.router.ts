import { Request, Response, Router } from 'express';
import * as boardsService from './board.service';

const router = Router();

router.route('/').post(async (req: Request, res: Response) => {
  const board = await boardsService.createBoard(req.body);
  res.status(201).json(board);
});

router.route('/').get(async (_req: Request, res: Response) => {
  const boards = await boardsService.getAllBoards();
  res.status(200).json(boards);
});

router.route('/:id').get(async (req: Request, res: Response) => {
  if (!req.params['id']) {
    res.status(404).send('Wrong ID');
  }
  const board = await boardsService.getBoardById(req.params['id']!);
  if (board) {
    res.status(200).json(board);
  } else {
    res.status(404).send('Board not found');
  }
});

router.route('/:id').put(async (req: Request, res: Response) => {
  if (!req.params['id']) {
    res.status(404).send('Wrong ID');
  }
  const board = await boardsService.updateBoard(req.params['id']!, req.body);
  res.status(200).json(board);
});

router.route('/:id').delete(async (req: Request, res: Response) => {
  if (!req.params['id']) {
    res.status(404).send('Wrong ID');
  }
  const isBoardDeleted = await boardsService.deleteBoard(req.params['id']!);
  if (isBoardDeleted) {
    res.status(204).send('The board has been deleted');
  } else {
    res.status(404).send('Board not found');
  }

});

export { router as boardRouter };
