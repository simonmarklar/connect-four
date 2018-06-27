'use strict';
const Player = require('./src/Player');
const Ask = require('./src/strategies/Ask')

const MenuScreen = require('./src/screens/MenuScreen');

const menu = new MenuScreen();

menu.draw();