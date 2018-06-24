//@flow
'use strict';

const Slot = require('./Slot')

class Board {
  /*:: columns: number */
  /*:: rows: number */
  /*:: store: Slot[][] */
  constructor( columns/*: number */, rows/*: number */) {
    this.columns = columns;
    this.rows = rows;
    this.createStore();
  }

  createStore () {
    
  }

  draw() {

  }
}

module.exports = Board;