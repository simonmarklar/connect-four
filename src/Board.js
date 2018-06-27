//@flow
'use strict';
/*:: import type {PLAYER_ENUM} from './constants' */
const Slot = require('./Slot');


class Board {
  /*:: columns: number */
  /*:: rows: number */
  /*:: store: Slot[][] */
  /*:: @@iterator(): Iterator<Slot[]> { return (this: any) } */
  constructor( columns/*: number */, rows/*: number */) {
    this.columns = columns;
    this.rows = rows;
    this.createStore();
  }

  //$FlowFixMe - doesnt support computed property names
  * [Symbol.iterator] ()/* : Slot[] */ {
    for (let row = 0; row < this.rows; row++) {
      yield this.store[row]
    }
  }

  getRow (row/* : number */) {
    if (row < 0 || row >= this.rows) {
      throw new Error('Cannot get out of bounds row')
    }

    return this.store[row]
  }

  getColumn (column/* : number */) {
    if (column < 0 || column >= this.columns) {
      throw new Error('Cannot get out of bounds column')
    }

    return this.store.reduce((m, row) => [...m, row[column]], [])
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

  canDrop (column/* : number */) {
    const col = this.getColumn(column);
    return col.some((c) => !c.isTaken)
  }

  drop (column/* : number */, playerId/* : PLAYER_ENUM */) {
    const col = this.getColumn(column);
    let row = this.rows - 1;
    while (row > -1) {
      const slot = col[row];
      if (!slot.isTaken) {
        slot.take(playerId);
        return
      }
      --row;
    }
  }

  draw() {
    let output = '';
    for (let row of this) {
      output += '|';
      for (let slot of row) {
        output += `${slot.draw()}|`;
      }
      output += '\r\n';
    }

    return output
  }
}

module.exports = Board;