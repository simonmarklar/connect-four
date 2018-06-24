//@flow

'use strict';
const Slot = require('./Slot');
const Board = require('./Board');
jest.mock('./Slot');

beforeEach(() => {
  //$FlowFixMe - flow doesnt detect this funciton is added by jest
  Slot.mockClear();
});

test('correct amount of slots should be created', () => {
  const board = new Board(2, 3);

  expect(board.store.length).toBe(3);
  expect(board.store[0].length).toBe(2);
});

test('should draw the right amount of slots', () => {
  const mockSlotDraw = jest.fn();
  //$FlowFixMe
  Slot.prototype.draw = mockSlotDraw
  const board = new Board(2, 2);
  board.draw();
  expect(mockSlotDraw).toHaveBeenCalledTimes(2 * 2)
})