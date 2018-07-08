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
    //Define variables that might be used in more
    //than one function
    let dungeon = null;
    let explorer = null;
    let treasure = null;
    let door = null;
    let id = null;

    //There are 3 ways to make sprites from textures atlas frames
    //1. Access the `TextureCache` directly
    const dungeonTexture = utils.TextureCache['dungeon.png'];
    // let dungeonTexture = TextureCache['dungeon.png'];
    dungeon = new Sprite(dungeonTexture);
    this.addChild(dungeon);
    //2. Access the texture using throuhg the loader's `resources`:
    explorer = new Sprite(loader.resources.th_json.textures['explorer.png']);
    explorer.x = 68;
    //Center the explorer vertically
    explorer.y = dungeon.height / 2 - explorer.height / 2;
    this.addChild(explorer);
    //3. Create an optional alias called `id` for all the texture atlas
    //frame id textures.
    id = utils.TextureCache;

    //Make the treasure box using the alias
    treasure = new Sprite(id['treasure.png']);
    this.addChild(treasure);
    //Position the treasure next to the right edge of the canvas
    treasure.x = dungeon.width - treasure.width - 48;
    treasure.y = dungeon.height / 2 - treasure.height / 2;
    this.addChild(treasure);
    //Make the exit door
    door = new Sprite(id['door.png']);
    door.position.set(32, 0);
    this.addChild(door);

    //Make the blobs
    const numberOfBlobs = 6;
    const spacing = 48;
    const xOffset = 150;
    //Make as many blobs as there are `numberOfBlobs`
    for (let i = 0; i < numberOfBlobs; i++) {
      //Make a blob
      const blob = new Sprite(id['blob.png']);
      //Space each blob horizontally according to the `spacing` value.
      //`xOffset` determines the point from the left of the screen
      //at which the first blob should be added.
      const x = spacing * i + xOffset;
      //Give the blob a random y position
      //(`randomInt` is a custom function - see below)
      const y = this.randomInt(0, dungeon.height - blob.height);
      //Set the blob's position
      blob.x = x;
      blob.y = y;
      //Add the blob sprite to the stage
      this.addChild(blob);
    }
  }

  //The `randomInt` helper function
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  onExit(cb) {
    super.onExit(cb);
  }
}

export default LessonsScene;
