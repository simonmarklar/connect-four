'use strict';
/*::
import type {PLAYER_ENUM}  from './constants'
*/

const Board = require('./Board');
const Analyser = require('./Analyser');
const {PLAYER_ONE} = require('./constants');

let board /*: Board */;

beforeEach(() => {
  board = new Board(7, 6);
});

test('no one should win on an empty board', () => {
  const a = new Analyser(board);
  expect(a.analyse(0, 0, PLAYER_ONE)).toBe(false);
});

test('player should not win unless 4 slots are taken by it', () => {
  const a = new Analyser(board);
  board.drop(3, PLAYER_ONE);
  expect(a.analyse(board.rows, 3)).toBe(false);
});

test('should detect a win in going up + right', () => {
  [[5, 6], [4, 5], [3, 4], [2, 3]].forEach((slotId) => board.getSlot(...slotId).take(PLAYER_ONE));
  const dir = [-1, -1];
  const a = new Analyser(board);
  expect(a.check(5, 6, dir, PLAYER_ONE)).toBe(true);
});

test('should detect a win in going up', () => {
  [[5, 6], [4, 6], [3, 6], [2, 6]].forEach((slotId) => board.getSlot(...slotId).take(PLAYER_ONE));
  const dir = [-1, 0];
  const a = new Analyser(board);
  expect(a.check(5, 6, dir, PLAYER_ONE)).toBe(true);
});

test('should detect a win in going up + left', () => {
  [[5, 2], [4, 3], [3, 4], [2, 5]].forEach((slotId) => board.getSlot(...slotId).take(PLAYER_ONE));
  const dir = [-1, 1];
  const a = new Analyser(board);
  expect(a.check(5, 2, dir, PLAYER_ONE)).toBe(true);
});

test('should detect a win in going right', () => {
  [[0, 3], [0, 2], [0, 1], [0, 0]].forEach((slotId) => board.getSlot(...slotId).take(PLAYER_ONE));
  const dir = [0, -1];
  const a = new Analyser(board);
  expect(a.check(0, 3, dir, PLAYER_ONE)).toBe(true);
});

test('should detect a win in going left', () => {
  [[0, 0], [0, 1], [0, 2], [0, 3]].forEach((slotId) => board.getSlot(...slotId).take(PLAYER_ONE));
  const dir = [0, 1];
  const a = new Analyser(board);
  expect(a.check(0, 0, dir, PLAYER_ONE)).toBe(true);
});


test('should detect a win in going down + right', () => {
  [[2, 5], [3, 4], [4, 3], [5, 2]].forEach((slotId) => board.getSlot(...slotId).take(PLAYER_ONE));
  const dir = [1, -1];
  const a = new Analyser(board);
  expect(a.check(2, 5, dir, PLAYER_ONE)).toBe(true);
});

test('should detect a win in going down', () => {
  [[5, 6], [4, 6], [3, 6], [2, 6]].forEach((slotId) => board.getSlot(...slotId).take(PLAYER_ONE));
  const dir = [1, 0];
  const a = new Analyser(board);
  expect(a.check(2, 6, dir, PLAYER_ONE)).toBe(true);
});

test('should detect a win in going down + left', () => {
  [[5, 6], [4, 5], [3, 4], [2, 3]].forEach((slotId) => board.getSlot(...slotId).take(PLAYER_ONE));
  const dir = [1, 1];
  const a = new Analyser(board);
  expect(a.check(2, 3, dir, PLAYER_ONE)).toBe(true);
});