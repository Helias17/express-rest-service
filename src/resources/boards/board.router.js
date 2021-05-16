const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').post(async (req, res) => {
  console.log(req.body);
  const board = await boardsService.createBoard(req.body);
  res.status(201).json(board);
});


module.exports = router;
