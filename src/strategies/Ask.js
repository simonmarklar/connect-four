//@flow
'use strict';
// pull in flowtypes
const readline = require('readline');
const Board = require('../Board');

/*:: 
import type {Strategy} from '../../types.js'
*/

module.exports = class Ask /* implements Strategy */ {
  /*:: 
    tty: readline.Interface
    question: string
  */
  constructor (tty/* : readline.Interface */, question/* : string */) {
    this.tty = tty;
    this.question = question;
  }

  execute (board/* : Board */) {
    return new Promise((resolve, reject) => {
      this.tty.question(this.question, (input/* : string */) => {
        const column = parseInt(input.trim(), 10);
        if (!Number.isInteger(column) || !board.canDrop(column)) {
          return reject(new Error('Invalid Input. Try again.'));
        }

        resolve(column - 1);
      })
    })
  }
}