//@flow
'use strict';

const chalk = require('chalk');

const {PLAYER_ONE, PLAYER_TWO} = require('./constants');

class Slot {
  /*:: takenBy: string */
  get isTaken () {
    return !!this.takenBy;
  }

  take (playerId/*: string */) {
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