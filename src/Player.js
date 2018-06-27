//@flow

'use strict';
/*:: 
import type {Strategy} from '../types.js'
*/

const Board = require('./Board')

module.exports = class Player {
  /*:: 
  strategy: Strategy
  */
  constructor (strategy/* : Strategy */, ) {
    this.strategy = strategy;
  }

  play (board/* : Board */)/* : Promise<number> */ {
    return this.strategy.execute(board);
  }
}

