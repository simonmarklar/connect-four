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
    this.store = []
    for (let row = 0; row < this.rows; row++) {
      this.store[row] = []
      for (let column = 0; column < this.columns; column++) {
        this.store[row].push(new Slot());
      }
    }
  }

  draw() {
    let output = '';
    for (let row = 0; row < this.rows; row++) {
      output += '|';
      for (let column = 0; column < this.columns; column++) {
        output += this.store[row][column].draw();
      }
      output += '|';
    }

    return output
  }
}

module.exports = Board;