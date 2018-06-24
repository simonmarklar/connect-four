//@flow

'use strict';
const chalk = require('chalk');

const Slot = require('./Slot.js');

let slot;

beforeEach(() => {
  slot = new Slot();
});

test('should not start as taken by a player', () => {
  expect(slot.isTaken).toBeFalsy();
});

test('should register if taken by player', () => {
  const expectedId = 'PLAYER_ONE';
  slot.take(expectedId);
  expect(slot.isTaken).toBeTruthy();
  expect(slot.takenBy).toBe(expectedId);
});

test('should draw an empty slot when not taken', () => {
  expect(slot.draw()).toBe(' ')
});

test('should draw a red `o` when taken by player 1', () => {
  slot.take('PLAYER_ONE');
  expect(slot.draw()).toBe(chalk.red('o'))
});

test('should draw a yellow `o` when taken by player 2', () => {
  slot.take('PLAYER_TWO');
  expect(slot.draw()).toBe(chalk.yellow('o'))
})