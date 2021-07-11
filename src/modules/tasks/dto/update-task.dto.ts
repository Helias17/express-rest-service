export class UpdateTaskDto {
  readonly title: string;
  readonly order: number;
  readonly description: string;
  readonly userId: string | null;
  readonly boardId: string | null;
  readonly columnId: string | null;

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
