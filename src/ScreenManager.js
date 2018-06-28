//@flow
'use strict';
/*:: 
import type {GAME_MODE} from './constants.js'
*/

const Screen = require('./screens/Screen');
const MenuScreen = require('./screens/MenuScreen');
const GameScreen = require('./screens/GameScreen');

module.exports = class ScreenManager {
  /*::
  current: Screen
  */ 
  showMenu () {
    this.closeScreen();
    this.current = new MenuScreen();
    this.current.on('play', (mode/* : GAME_MODE */) => this.play(mode));
    this.current.on('quit', () => this.quit());
    this.current.draw();
  }

  play (mode/* : GAME_MODE */) {
    this.closeScreen();
    this.current = new GameScreen(mode);
    this.current.on('finished', () => this.showMenu());
    this.current.on('quit', () => this.quit());
    this.current.draw();
  }

  closeScreen () {
    if (this.current) {
      this.current.removeAllListeners();
      this.current.closeTTY();
    }
  }

  quit () {
    this.closeScreen();
    process.exit(0);
  }
}