const uuid = require('uuid');

class Task {
  constructor({
    id = uuid.v4(),
    title = 'Task title',
    order = 0,
    description = "Task description",
    userId = "user id",
    boardId = "board id",
    columnId = "column id"
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
