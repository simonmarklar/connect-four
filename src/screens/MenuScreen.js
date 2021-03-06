//@flow
'use strict';

/*:: 
import type {GAME_MODE} from '../constants.js'
*/

const chalk = require('chalk');

const Screen = require('./Screen');
const { TWO_PLAYER, EASY_AI } = require('../constants');

module.exports = class MenuScreen extends Screen {
  processInput (input/* : string */) {
    switch (input.trim().toLowerCase()) {
      case 'p':
        this.emit('play', TWO_PLAYER);
        break;
      case 'e':
        this.emit('play', EASY_AI);
        break;
      case 'q':
        process.exit(0);
        break;
      default:
        this.draw();
    }
  }

  draw () {
    this.clearScreen();
    this.tty.question(chalk`{green
_________                                     __   
\\_   ___ \\  ____   ____   ____   ____   _____/  |_ 
/    \\  \\/ /  _ \\ /    \\ /    \\_/ __ \\_/ ___\\   __\\
\\     \\___(  <_> )   |  \\   |  \\  ___/\\  \\___|  |  
 \\______  /\\____/|___|  /___|  /\\___  >\\___  >__|  
        \\/            \\/     \\/     \\/     \\/      
___________                  
\\_   _____/___  __ _________ 
 |    __)/  _ \\|  |  \\_  __ \\
 |     \\(  <_> )  |  /|  | \\/
 \\___  / \\____/|____/ |__|   
     \\/                       

  Two player ({red p})lay
  ({red e})asy AI
  ({red q})uit
}`, (input) => this.processInput(input))
  }
}