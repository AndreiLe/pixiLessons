import 'pixi.js';
import 'CLIENT/style.css';
import Game from 'CLIENT/modules/Game';
import app from 'CLIENT/createApp';

const game = new Game(app);
game.init();
