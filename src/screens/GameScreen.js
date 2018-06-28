//@flow
'use strict';

/*:: import type {Strategy} from '../../types.js' */

const chalk = require('chalk');

const Screen = require('./Screen');
const Board = require('../Board');
const Player = require('../Player');
const Ask = require('../strategies/Ask')

module.exports = class GameScreen extends Screen {
  /*:: 
    board: Board 
    players: Player[]
    currentPlayer: number
    message: string
  */

  constructor () {
    super();
    this.board = new Board(7, 6);
    this.players = [];
    this.players.push(new Player(new Ask(this.tty, `Select a column (1 to ${this.board.columns}): `)));
    this.currentPlayer = 0;
    this.message = ''
  }

  update () {
    return this.players[this.currentPlayer]
      .play(this.board)
      .then(column => this.draw())
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
      this.message = '';
    } else {
      this.tty.write(`
    
`);
    }
    this.update();
  }
}