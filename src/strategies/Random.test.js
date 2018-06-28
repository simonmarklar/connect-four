'use strict';
const Random = require('./Random');
const Board = require('../Board');
const Slot = require('../Slot');
jest.mock('../Slot');

test('should pick a random column', () => {
  const random = new Random();
  expect(random.execute(new Board(3,3))).resolves.toBeLessThan(3)
});

test('should reject with a give up message if it cant make a move', () => {
  const random = new Random();
  const board = new Board(3, 3);
  Slot.mock.instances.forEach((s) => (s.isTaken = true));
  expect(random.execute(board)).rejects.toThrowError('I give up :(');
})