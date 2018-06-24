//@flow
'use strict';

class Slot {
  /*:: takenBy: string */
  get isTaken () {
    return !!this.takenBy;
  }

  take (playerId/*: string */) {
    
  }

  draw () {

  }
}

module.exports = Slot