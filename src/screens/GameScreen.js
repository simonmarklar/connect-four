//@flow
'use strict';

/*:: 
import type {Strategy} from '../../types.js' 
import type {GAME_MODE} from '../constants.js'
*/

const chalk = require('chalk');

const Screen = require('./Screen');
const Board = require('../Board');
const Player = require('../Player');
const Ask = require('../strategies/Ask');
const {TWO_PLAYER, PLAYER_ONE, PLAYER_TWO} = require('../constants');

module.exports = class GameScreen extends Screen {
  /*:: 
    board: Board 
    players: Player[]
    currentPlayer: number
    message: string
  */

  constructor (mode/* : GAME_MODE */) {
    super();
    this.board = new Board(7, 6);
    this.players = [];
    this.players.push(new Player(new Ask(this.tty, `Player 1, Select a column (1 to ${this.board.columns}): `)));
    switch (mode) {
      case TWO_PLAYER:
        this.players.push(new Player(new Ask(this.tty, `Player 2, Select a column (1 to ${this.board.columns}): `)))
    }
    this.currentPlayer = 0;
    this.message = ''
  }

  update () {
    this.message = '';
    return this.players[this.currentPlayer]
      .play(this.board)
      .then(column => this.board.drop(column, this.currentPlayer === 0 ? PLAYER_ONE : PLAYER_TWO))
      .then(() => {
        this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
        this.draw();
      })
      .catch((err) => {
        this.message = err.message;
        return this.draw();
      });
  }

  draw () {
    this.clearScreen();
    this.tty.write(`
    
`);
    this.tty.write(chalk.green(this.board.draw()));
    
    if ( this.message ) {
      this.tty.write(`${chalk.red(this.message)}

`);
    } else {
      this.tty.write(`
    
`);
    }
    this.update();
  }
}