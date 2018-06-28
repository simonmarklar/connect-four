//@flow
'use strict';

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
    this.current.on('play', () => this.play());
    this.current.on('quit', () => this.quit());
    this.current.draw();
  }

  play () {
    this.closeScreen();
    this.current = new GameScreen();
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