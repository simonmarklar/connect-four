//@flow
'use strict';

const chalk = require('chalk');

const Screen = require('./Screen')
const Board = require('../Board')

class GameScreen extends Screen {
  /*:: board: Board */
  constructor () {
    super();
    this.board = new Board(7, 6)
  }

  processInput (input) {

  }

  draw () {
    this.tty.write(chalk.green(this.board.draw()))
  }
}

module.exports = GameScreen;