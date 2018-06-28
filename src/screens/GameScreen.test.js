'use strict';

const Board = require('../Board');
const Player = require('../Player');
const Ask = require('../strategies/Ask');
const GameScreen = require('./GameScreen');
const {TWO_PLAYER, PLAYER_ONE, PLAYER_TWO} = require('../constants');

jest.mock('../Board');
jest.mock('../Player');
jest.mock('../strategies/Ask');

beforeEach(() => {
  Ask.mockClear();
  Player.mockClear();
  Board.mockClear();
})

test('should create two human players', () => {
  const gs = new GameScreen(TWO_PLAYER);
  expect(Ask).toHaveBeenCalledTimes(2);
});

test('should start with player 1', () => {
  const gs = new GameScreen(TWO_PLAYER);
  gs.draw = () => true;
  const player1Mock = Player.mock.instances[0];
  player1Mock.play.mockResolvedValue(1);

  return gs.update()
    .then(() => {
      expect(player1Mock.play).toHaveBeenCalledTimes(1);
    });
});

test('should player 2 should go after player 1', () => {
  const gs = new GameScreen(TWO_PLAYER);
  gs.draw = () => true;
  const player1Mock = Player.mock.instances[0];
  const player2Mock = Player.mock.instances[1];

  player1Mock.play.mockResolvedValue(1);
  player2Mock.play.mockResolvedValue(1);

  return gs.update()
    .then(() => {
      expect(player1Mock.play).toHaveBeenCalledTimes(1);
    })
    .then(() => gs.update())
    .then(() => {
      expect(player2Mock.play).toHaveBeenCalledTimes(1);
    });
});