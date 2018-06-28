//@flow
'use strict';
const readline = require('readline');
const EventEmitter = require('events');

module.exports = class Screen extends EventEmitter {
  /*:: tty: readline.Interface*/
  constructor (options/*: Object*/ = {}) {
    super();
    this.tty = readline.createInterface(Object.assign({}, {
      input: process.stdin,
      output: process.stdout,
      terminal: true
    }, options));
  }

  clearScreen () {
    this.tty.write(null, {ctrl: true, name: 'l'});
  }

  closeTTY () {
    this.tty.close();
  }

  draw ()/*: void */ {
    throw new Error('not implemented');
  }
}