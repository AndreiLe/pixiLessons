import { Container, Sprite, Texture } from 'pixi.js';
import SceneManager from 'CLIENT/managers/SceneManager';

class Scene extends Container {
  constructor({ id }) {
    super();

    this.id = id;
    this.sceneManager = SceneManager.getInstance();
    this.app = this.sceneManager.app;
    this.ticker = this.app.ticker;
    this.background = this.addBackground();

    this.onTick = this.onTick.bind(this);
  }

  addBackground() {
    const { screen } = this.app;
    const background = new Sprite(Texture.WHITE);
    background.alpha = 0;
    background.width = screen.width;
    background.height = screen.height;
    background.tint = 0x000000;
    this.addChild(background);
    return background;
  }

  onTick() {
    const { screen } = this.app;
    this.background.width = screen.width;
    this.background.height = screen.height;
  }

  onExit(cb) {
    cb(this.id);
  }
}

export default Scene;
