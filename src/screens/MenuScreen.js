//@flow
'use strict';

const chalk = require('chalk');

const Screen = require('./Screen');

module.exports = class MenuScreen extends Screen {
  processInput (input/* : string */) {
    switch (input.trim()) {
      case 'p':
        this.emit('play');
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

  ({red p})lay
  ({red q})uit
}`, (input) => this.processInput(input))
  }
}