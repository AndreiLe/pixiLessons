import { loader, Sprite, utils, Rectangle } from 'pixi.js';
import Scene from 'CLIENT/modules/Scene';
import assets from 'CLIENT/assets';

class LessonsScene extends Scene {
  constructor({ id }) {
    super({ id });

    this.init();
  }

  init() {
    this.loadAssets();
  }

  loadAssets() {
    loader
      .add(assets)
      .on('progress', () => {
        //console.log('progress');
      })
      .on('complete', () => {
        //console.log('complete');
        this.setup();
      })
      .on('error', () => {
        //console.log('error');
      })
      .load(() => {
        // console.log('load');
      });
  }

  //This `setup` function will run when the image has loaded
  setup() {
    //Create the `tileset` sprite from the texture
    const texture = utils.TextureCache.tileset;
    //Create a rectangle object that defines the position and
    //size of the sub-image you want to extract from the texture
    const rectangle = new Rectangle(192, 128, 64, 64);
    //Tell the texture to use that rectangular section
    texture.frame = rectangle;
    //Create the sprite from the texture
    const rocket = new Sprite(texture);
    //Position the rocket sprite on the canvas
    rocket.x = 32;
    rocket.y = 32;
    //Optionally use `pivot` to move the sprite's x and y position
    /*
    rocket.pivot.set(32, 32);
    rocket.rotation = 0.3;
    console.log(rocket.position)
    */
    //Add the rocket to the stage
    this.addChild(rocket);
  }

  onExit(cb) {
    super.onExit(cb);
  }
}

export default LessonsScene;
