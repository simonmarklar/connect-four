//@flow
'use strict';
// pull in flowtypes
const readline = require('readline');
const Board = require('../Board');

/*:: 
import type {Strategy} from '../../types.js'
*/

module.exports = class Random /* implements Strategy */ {
  execute (board/* : Board */) {
    const random = () => Math.floor(Math.random() * Math.floor(board.columns));
    let col = random();
    let attempts = board.columns * 10; // failsafe to break out of the while loop
    while (!board.canDrop(col)) {
      col = random();
      if (--attempts <= 0) {
        return Promise.reject(new Error('I give up :('));
      };
    }
    return Promise.resolve(col);
  }


};