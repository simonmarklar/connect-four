//@flow
'use strict';

/*:: 
import type {Strategy} from '../../types.js' 
import type {GAME_MODE, PLAYER_ENUM} from '../constants.js'
*/

const chalk = require('chalk');

const Screen = require('./Screen');
const Board = require('../Board');
const Player = require('../Player');
const Ask = require('../strategies/Ask');
const Random = require('../strategies/Random');
const Analyser = require('../Analyser');
const {TWO_PLAYER, EASY_AI, PLAYER_ONE, PLAYER_TWO} = require('../constants');

module.exports = class GameScreen extends Screen {
  /*:: 
    board: Board 
    analyser: Analyser
    players: Player[]
    currentPlayer: PLAYER_ENUM
    message: string
  */

  constructor (mode/* : GAME_MODE */) {
    super();
    this.board = new Board(7, 6);
    this.analyser = new Analyser(this.board);
    this.players = [];
    this.players.push(new Player(new Ask(this.tty, `Player 1, Select a column (1 to ${this.board.columns}) or 'q' to give up: `)));
    switch (mode) {
      case TWO_PLAYER:
        this.players.push(new Player(new Ask(this.tty, `Player 2, Select a column (1 to ${this.board.columns}) or 'q' to give up: `)));
        break;
      case EASY_AI:
        this.players.push(new Player(new Random()));
        break;
    }
    this.currentPlayer = PLAYER_ONE;
    this.message = ''
  }

  update () {
    this.message = '';
    if (this.board.isFull) {
      this.tty.write(`${chalk.red('oh no! stalemate!')}

`);
      setTimeout(() => this.emit('finished'), 3000);
      return Promise.resolve();
    }
    return this.players[this.currentPlayer]
      .play(this.board)
      .then(column => this.board.drop(column, this.currentPlayer))
      .then(([row, col]) => {
        if (this.analyser.analyse(row, col, this.currentPlayer)) {
          this.drawBoard();
          this.tty.write(`${chalk.red(`Player ${this.currentPlayer === PLAYER_ONE ? 'one' : 'two'} wins!`)}

`);
          setTimeout(() => this.emit('finished'), 3000);
        } else {
          this.currentPlayer = this.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
          this.draw();
        }
      })
      .catch((err) => {
        this.message = err.message;
        return this.draw();
      });
  }

  drawBoard () {
    this.clearScreen();
    this.tty.write(`
    
`);
    this.tty.write(chalk.green(this.board.draw()));
    
  }

  draw () {
    this.drawBoard();
    if ( this.message ) {
      this.tty.write(`${chalk.red(this.message)}

`);
    } else {
      this.tty.write(`
    
`);
    }
    if (this.message === 'Player gave up') {
      setTimeout(() => this.emit('finished'), 3000);
      return
    }
    this.update();
  }
}