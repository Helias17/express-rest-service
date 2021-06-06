import { v4 as uuidv4 } from 'uuid';

class Task {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;

  constructor({
    id = uuidv4(),
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
