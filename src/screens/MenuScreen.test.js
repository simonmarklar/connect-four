//@flow
'use strict';
const MenuScreen = require('./MenuScreen');
const {TWO_PLAYER} = require('../constants');

let menuScreen

beforeEach(() => {
  menuScreen = new MenuScreen();
})

afterEach(() => {
  menuScreen.tty.close();
})

test('shows options again if input is invalid', () => {
  const drawSpy = jest.fn();
  //$FlowFixMe
  menuScreen.draw = drawSpy;
  menuScreen.processInput('a');
  expect(drawSpy).toHaveBeenCalled();
});

test('`q` will exit the game correctly', () => {
  const exitSpy = jest.fn();
  //$FlowFixMe
  process.exit = exitSpy;
  menuScreen.processInput('q');
  expect(exitSpy).toHaveBeenCalledWith(0);
  menuScreen.tty.close();
})

test('`p` will fire the play event', () => {
  const eventSpy = jest.fn();
  menuScreen.on('play', eventSpy);
  menuScreen.processInput('p');
  expect(eventSpy).toHaveBeenCalledWith(TWO_PLAYER);
});