import { IColumn } from './../../interfaces/IColumn';
import { v4 as uuidv4 } from 'uuid';


class Board {
  id: string;
  title: string;
  columns: IColumn[] | null;

  constructor({
    id = uuidv4(),
    title = 'Board Title',
    columnsWithId = [],
  }) {
    this.id = id;
    this.title = title;
    this.columns = columnsWithId;
  }
}

module.exports = Board;
