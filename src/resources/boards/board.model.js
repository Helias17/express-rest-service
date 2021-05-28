const uuid = require('uuid');

class Board {
  constructor({
    id = uuid.v4(),
    title = 'Board Title',
    columnsWithId = [],
  }) {
    this.id = id;
    this.title = title;
    this.columns = columnsWithId;
  }
}

module.exports = Board;
