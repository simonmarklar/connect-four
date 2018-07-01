//@flow
'use strict';
/*:: import type {PLAYER_ENUM} from './constants' */
const chalk = require('chalk');

const {PLAYER_ONE, PLAYER_TWO} = require('./constants');

class Slot {
  /*:: takenBy: PLAYER_ENUM */
  get isTaken () {
    return this.takenBy === PLAYER_ONE || this.takenBy === PLAYER_TWO;
  }

  take (playerId/*: PLAYER_ENUM */) {
    this.takenBy = playerId
  }

  draw () {
    switch (this.takenBy) {
      case PLAYER_ONE:
        return chalk.red('o');
      case PLAYER_TWO:
        return chalk.yellow('o');
      default:
        return ' ';
    }
  }
}

module.exports = Slot