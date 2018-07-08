import { loader, Sprite, utils, /*Container,*/ ParticleContainer } from 'pixi.js';
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
      .on('complete', () => {
        //console.log('complete');
        this.setup();
      })
      .load(() => {
        // console.log('load');
      });
  }

  //This `setup` function will run when the image has loaded
  setup() {
    //There are three ways to make sprites from textures atlas frames
    //Make the three animal sprites
    //Create an alias for the texture atlas frame ids
    const id = utils.TextureCache;
    //The cat
    const cat = new Sprite(id['cat.png']);
    cat.position.set(16, 16);
    //The hedgehog
    const hedgehog = new Sprite(id['hedgehog.png']);
    hedgehog.position.set(32, 32);
    //The tiger
    const tiger = new Sprite(id['tiger.png']);
    tiger.position.set(64, 64);
    //Group the animals simple container
    // const animals = new Container();
    //Group the animals fast container
    const animals = new ParticleContainer(
      3,
      {
        rotation: true,
        alphaAndtint: true,
        scale: true,
        uvs: true
      }
    );
    animals.addChild(cat);
    animals.addChild(hedgehog);
    animals.addChild(tiger);
    //Add the `animals` group to the stage
    this.addChild(animals);
    //Change the position of the group
    animals.position.set(64, 64);
    //Optionally change the group's width and height
    //animals.width = 200;
    //animals.height = 200;
    //Find out what the `animal` groups's children are
    console.log(animals.children);
    //Displays: [Sprite, Sprite, Sprite]
    //Find out what the group's position and size is
    console.log(animals.position);
    //Displays: Point{x: 0, y: 0 ...}
    console.log(animals.width);
    //Displays: 112
    console.log(animals.height);
    //Displays: 112
    //Find the cat's local position
    console.log(cat.x);
    //Displays: 16

    //Find the cat's global position
    console.log(animals.toGlobal(cat.position));
    //Displays: Point{x: 80, y: 80...};
    //Use `getGlobalPosition` to find the sprite's
    //global position
    console.log('Tiger world x: ', tiger.getGlobalPosition().x);
    console.log('Tiger world y: ', tiger.getGlobalPosition().y);
    //Use `toLocal` to find a sprite's position relative to another sprite
    console.log('Tiger local x: ', tiger.toLocal(tiger.position, hedgehog).x);
    console.log('Tiger local y: ', tiger.toLocal(tiger.position, hedgehog).y);
  }

  onExit(cb) {
    super.onExit(cb);
  }
}

export default LessonsScene;
