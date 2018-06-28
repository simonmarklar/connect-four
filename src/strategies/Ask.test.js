'use strict';
const Ask = require('./Ask');
const Board = require('../Board');

test('should resolve with the column number', () => {
  const mockQuestion = jest.fn((q, cb) => cb('1'));
  const ask = new Ask({question: mockQuestion}, 'test');
  
  return expect(ask.execute(new Board(2, 2))).resolves.toBe(0); // 0 because input starts at 1, array starts at 0
});

test('should resolve with the column number when selecting the last column', () => {
  const mockQuestion = jest.fn((q, cb) => cb('2'));
  const ask = new Ask({question: mockQuestion}, 'test');
  
  return expect(ask.execute(new Board(2, 2))).resolves.toBe(1); // 1 because input starts at 1, array starts at 0
});

test('should resolve with the column number when selecting the first column', () => {
  const mockQuestion = jest.fn((q, cb) => cb('1'));
  const ask = new Ask({question: mockQuestion}, 'test');
  
  return expect(ask.execute(new Board(2, 2))).resolves.toBe(0); // 1 because input starts at 1, array starts at 0
});

test('should reject if an invlaid column number is selected', () => {
  const mockQuestion = jest.fn((q, cb) => cb('100'));
  const ask = new Ask({question: mockQuestion}, 'test');
  
  return expect(ask.execute(new Board(2, 2))).rejects.toThrow('Invalid Input. Try again.');
});

test('should reject if an column is full', () => {
  const mockQuestion = jest.fn((q, cb) => cb('100'));
  const ask = new Ask({question: mockQuestion}, 'test');
  const board = new Board(2, 2);
  board.canDrop = jest.fn();
  board.canDrop.mockReturnValue(false);
  const result = ask.execute(board);
  expect(board.canDrop).toBeCalledTimes(1);
  return expect(result).rejects.toThrow('Invalid Input. Try again.');
});

