const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').post(async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  res.status(201).json(board);
});

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAllBoards();
  res.status(200).json(boards);
});

router.route('/:id').get(async (req, res) => {
  const boards = await boardsService.getBoardById(req.params.id);
  res.status(200).json(boards);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.updateBoard(req.params.id, req.body);
  res.status(200).json(board);
});

router.route('/:id').delete(async (req, res) => {
  const isBoardDeleted = await boardsService.deleteBoard(req.params.id);
  if (isBoardDeleted) {
    res.status(204).send('The board has been deleted');
  } else {
    res.status(404).send('Board not found');
  }

});


module.exports = router;
