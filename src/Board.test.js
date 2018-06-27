//@flow

'use strict';
const Slot = require('./Slot');
const Board = require('./Board');
const {PLAYER_ONE, PLAYER_TWO} = require('./constants');
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
});

test('should return the row', () => {
  const board = new Board(4, 3);
  const slot1 = new Slot();
  const slot2 = new Slot();
  const slot3 = new Slot();
  board.store[0][0] = slot1
  board.store[0][1] = slot2
  board.store[0][2] = slot3
  const row = board.getRow(0);
  expect(row[0]).toBe(slot1);
});

test('should return the column', () => {
  const board = new Board(3, 3);
  const slot1 = new Slot();
  const slot2 = new Slot();
  const slot3 = new Slot();
  const slots = [slot1, slot2, slot3];
  board.store[0][1] = slot1;
  board.store[1][1] = slot2;
  board.store[2][1] = slot3;
  const column = board.getColumn(1);
  expect(column).toEqual(expect.arrayContaining(slots))
});

test('should allow drop when no slots in column are taken', () => {
  const board = new Board(3, 3);
  //$FlowFixMe - force free slots
  Slot.prototype.isTaken = false;
  expect(board.canDrop(1)).toBe(true);
});

test('should disallow drop when all slots in column are taken', () => {
  const board = new Board(3, 3);
  //$FlowFixMe - force no free slots
  Slot.prototype.isTaken = true;
  expect(board.canDrop(1)).toBe(false);
});

test('should disallow drop when all invalid coumn is selected', () => {
  const board = new Board(3, 3);
  //$FlowFixMe - force no free slots
  Slot.prototype.isTaken = true;
  expect(board.canDrop(100)).toBe(false);
});

test('should drop a chip into the right column and row', () => {
  const board = new Board(4, 3);
  const mockSlotTake = jest.fn();
  //$FlowFixMe
  Slot.prototype.take = mockSlotTake;
  //$FlowFixMe
  Slot.prototype.isTaken = false;
  board.drop(3, PLAYER_ONE);
  expect(board.store[2][3].take).toHaveBeenCalledWith(PLAYER_ONE);
});