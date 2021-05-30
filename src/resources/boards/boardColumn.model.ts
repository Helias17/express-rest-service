import { v4 as uuidv4 } from 'uuid';

class BoardColumn {
  id: string;
  title: string;
  order: number;

  constructor({
    id = uuidv4(),
    title = 'Column Title',
    order = 0
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = BoardColumn;