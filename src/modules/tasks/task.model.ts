
export class Task {
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;

  constructor({
    title = 'Task title',
    order = 0,
    description = "Task description",
    userId = "user id",
    boardId = "board id",
    columnId = "column id"
  }) {
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

