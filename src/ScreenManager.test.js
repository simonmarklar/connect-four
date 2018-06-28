'use strict';
const EventEmitter = require('events');

const mockScreen = () => {
  const mock = new EventEmitter();
  mock.draw = jest.fn();
  mock.closeTTY = jest.fn();
  mock.clearScreen = jest.fn();

  return mock;
};

const GameScreen = require('./screens/GameScreen');
const MenuScreen = require('./screens/MenuScreen');
const ScreenManager = require('./ScreenManager');

jest.mock('./screens/GameScreen', function () {
  return function () {
    return mockScreen();
  }
});
jest.mock('./screens/MenuScreen', function () {
  return function () {
    return mockScreen();
  }
});

test('should draw the menu screen', () => {
  const sm = new ScreenManager();
  sm.showMenu();
  expect(sm.current.draw).toHaveBeenCalledTimes(1);
});

test('should load the game screen when menu fires `play` event', () => {
  const sm = new ScreenManager();
  sm.showMenu();
  sm.current.emit('play');
  expect(sm.current.draw).toHaveBeenCalledTimes(1);
});

test('should load the menu screen when game fires `finished` event', () => {
  const sm = new ScreenManager();
  sm.play();
  sm.current.emit('finished');
  expect(sm.current.draw).toHaveBeenCalledTimes(1);
});

test('should quit the game when the user selects `q` on the menu screen', () => {
  const exitSpy = jest.fn();
  const sm = new ScreenManager();
  process.exit = exitSpy;
  sm.showMenu();
  sm.current.emit('quit');
  expect(exitSpy).toHaveBeenCalledWith(0);
});

test('should quit the game when the user selects `q` on the menu screen', () => {
  const exitSpy = jest.fn();
  const sm = new ScreenManager();
  process.exit = exitSpy;
  sm.play();
  sm.current.emit('quit');
  expect(exitSpy).toHaveBeenCalledWith(0);
});