//@flow
'use strict';
/*:: import type {PLAYER_ENUM} from './constants' */
const Slot = require('./Slot');

const boundsCheck = (index, max) => {
  if (index < 0 || index >= max) {
    throw new Error(`Selection is less than 0 or greater than ${max}`);
  }
}

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

  get isFull () {
    return [...Array(this.columns).keys()].filter((col) => this.canDrop(col)).length === 0
  }

  getRow (row/* : number */) {
    boundsCheck(row, this.rows);

    return this.store[row]
  }

  getColumn (column/* : number */) {
    boundsCheck(column, this.columns);

    return this.store.reduce((m, row) => [...m, row[column]], [])
  }

  getSlot (row/* : number */, col/* : number */) {
    boundsCheck(row, this.rows);
    boundsCheck(col, this.columns);

    return this.store[row][col];
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
    try {
      const col = this.getColumn(column);
      return col.some((c) => !c.isTaken);
    } catch (e) {
      return false;
    }
  }

  drop (column/* : number */, playerId/* : PLAYER_ENUM */)/* : ?[number, number] */ {
    if (!this.canDrop(column)) return;
    const col = this.getColumn(column);
    let row = this.rows - 1;
    while (row > -1) {
      const slot = col[row];
      if (!slot.isTaken) {
        slot.take(playerId);
        return [row, column];
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