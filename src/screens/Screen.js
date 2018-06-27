//@flow
'use strict';
const readline = require('readline');

module.exports = class Screen {
  /*:: tty: readline.Interface*/
  constructor (options/*: Object*/ = {}) {
   this.tty = readline.createInterface(Object.assign({}, {
      input: process.stdin,
      output: process.stdout,
      terminal: true
    }, options));
  }

  draw ()/*: void */ {
    throw new Error('not implemented');
  }
}