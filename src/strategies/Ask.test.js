//@flow
'use strict';
const Ask = require('./Ask');
const Board = require('../Board');

test('should resolve with the column number', () => {
  const mockQuestion = jest.fn((q, cb) => cb('1'));
  //$FlowFixMe 
  const ask = new Ask({question: mockQuestion}, 'test');
  
  expect(ask.execute(new Board(2, 2))).resolves.toBe(0); // 0 because input starts at 1, array starts at 0
});

test('should reject if an invlaid column number is selected', () => {
  const mockQuestion = jest.fn((q, cb) => cb('100'));
  //$FlowFixMe 
  const ask = new Ask({question: mockQuestion}, 'test');
  
  expect(ask.execute(new Board(2, 2))).rejects.toThrow('Invalid Input. Try again.');
});

