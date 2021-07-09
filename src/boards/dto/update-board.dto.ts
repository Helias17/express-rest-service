import { BoardColumnEntity } from '../../entity/Column';

export class UpdateBoardDto {
  readonly title: string;
  readonly columns: BoardColumnEntity[];

  constructor({
    title = 'Board default title',
    columns = [],
  }) {
    this.title = title;
    this.columns = columns;
  }
}
