//@flow

'use strict';
/*::
import type {PLAYER_ENUM} from './constants.js'
*/
const Board = require('./Board');


module.exports = class Analyser {
  /*::
  board: Board
  */
  constructor (board/* : Board */) {
    this.board = board;
  }

  analyse (row/* : number */, col/* : number */, currentPlayer/* : PLAYER_ENUM */) {
    return [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],  [0, 0],  [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ].some(dir => this.check(row, col, dir, currentPlayer))
  }

  check (row/* : number */, col/* : number */, dir/* : [number, number] */, playerId/* : PLAYER_ENUM */, count/* : number */ = 0)/* : boolean */ {
    try {
      if (playerId !==  this.board.getSlot(row, col).takenBy) {
        return false;
      }

      if (count >= 3) {
        return true;
      }

      return this.check(row + dir[0], col + dir[1], dir, playerId, ++count);
    }
    catch (e) {
      return false;
    }
  }
}