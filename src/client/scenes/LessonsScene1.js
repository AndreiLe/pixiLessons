import { Sprite, Texture } from 'pixi.js';
import Scene from 'CLIENT/modules/Scene';

class LessonsScene extends Scene {
  constructor({ id }) {
    super({ id });

    this.init();
  }

  init() {
    this.loadAssets();
  }

  loadAssets() {
    this.setup();
  }

  setup() {
    const background = new Sprite(Texture.WHITE);
    background.alpha = 1;
    background.width = 100;
    background.height = 100;
    background.tint = 0xff0000;
    background.position.set(Math.floor(this.width / 2), Math.floor(this.height / 2));
    this.addChild(background);
  }

  onExit(cb) {
    super.onExit(cb);
  }
}

export default LessonsScene;
