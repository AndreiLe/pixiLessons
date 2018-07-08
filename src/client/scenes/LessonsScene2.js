import { loader, Sprite, utils } from 'pixi.js';
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
      .on('progress', (loader1, resource1) => {
        //console.log('progress');
        this.loadProgressHandler(loader1, resource1);
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

  loadProgressHandler(loader1, resource1) {
    //Display the file `url` currently being loaded
    console.log('loading: ', resource1.url);
    //If you gave your files names with the `add` method, you can access
    //them like this
    //console.log('loading: ' + resource.name);
    //Display the precentage of files currently loaded
    console.log('progress: ', loader1.progress, '%');
  }

  //This `setup` function will run when the image has loaded
  setup() {
    //console.log(loader.resources);

    //const cat = new Sprite(loader.resources.cat.texture);
    const cat = new Sprite(utils.TextureCache.cat);
    //Position the sprite and change its width and height
    cat.x = 96;
    cat.y = 96;
    //Optionally change the width and height
    cat.width = 80;
    cat.height = 120;
    //Optionally center the sprite's anchor point
    cat.anchor.x = 0.5;
    cat.anchor.y = 0.5;

    //Rotate the sprite
    cat.rotation = 0.3;
    //You can use this alternative syntax to set the
    //sprites anchor point, scale and rotation
    /*
    cat.anchor.set(0.5, 0.5);
    cat.position.set(120, 120);
    cat.scale.set(1.5, 3);
    */
    this.addChild(cat);
  }

  onExit(cb) {
    super.onExit(cb);
  }
}

export default LessonsScene;
