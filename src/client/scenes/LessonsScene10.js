import { loader, Graphics, TextStyle, Sprite, utils, Text } from 'pixi.js';
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
    //Create the this.box
    this.box = new Graphics();
    this.box.beginFill(0xCCFF99);
    this.box.drawRect(0, 0, 64, 64);
    this.box.endFill();
    this.box.x = 120;
    this.box.y = 96;
    this.addChild(this.box);
    //Create the `cat` sprite
    const cat = new Sprite(utils.TextureCache.cat);
    this.cat = cat;
    this.cat.x = 16;
    this.cat.y = 96;
    this.cat.vx = 0;
    this.cat.vy = 0;
    this.addChild(this.cat);

    //Capture the keyboard arrow keys
    const left = this.keyboard(37);
    const up = this.keyboard(38);
    const right = this.keyboard(39);
    const down = this.keyboard(40);

    //Left arrow key `press` method
    left.press = () => {
      //Change the cat's velocity when the key is pressed
      this.cat.vx = -5;
      this.cat.vy = 0;
    };
    //Left arrow key `release` method
    left.release = () => {
      //If the left arrow has been released, and the right arrow isn't down,
      //and the cat isn't moving vertically:
      //Stop the cat
      if (!right.isDown && this.cat.vy === 0) {
        this.cat.vx = 0;
      }
    };
    //Up
    up.press = () => {
      this.cat.vy = -5;
      this.cat.vx = 0;
    };
    up.release = () => {
      if (!down.isDown && this.cat.vx === 0) {
        this.cat.vy = 0;
      }
    };
    //Right
    right.press = () => {
      this.cat.vx = 5;
      this.cat.vy = 0;
    };
    right.release = () => {
      if (!left.isDown && this.cat.vy === 0) {
        this.cat.vx = 0;
      }
    };
    //Down
    down.press = () => {
      this.cat.vy = 5;
      this.cat.vx = 0;
    };
    down.release = () => {
      if (!up.isDown && this.cat.vx === 0) {
        this.cat.vy = 0;
      }
    };
    //Create the text sprite
    const style = new TextStyle({
      fontFamily: 'sans-serif',
      fontSize: 18,
      fill: 'white',
    });
    const message = new Text('No collision...', style);
    this.message = message;
    message.position.set(8, 8);
    this.addChild(message);

    //Start the game loop
    this.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop(delta) {
    //use the cat's velocity to make it move
    this.cat.x += this.cat.vx * delta;
    this.cat.y += this.cat.vy * delta;
    //check for a collision between the cat and the this.box
    if (this.hitTestRectangle(this.cat, this.box)) {
      //if there's a collision, change the message text
      //and tint the this.box red
      this.message.text = 'hit!';
      this.box.tint = 0xff3300;
    } else {
      //if there's no collision, reset the message
      //text and the this.box's color
      this.message.text = 'No collision...';
      this.box.tint = 0xccff99;
    }
  }

  //The `hitTestRectangle` function
  hitTestRectangle(r1, r2) {
    const hitR1 = r1;
    const hitR2 = r2;
    //Define the variables we'll need to calculate
    let hit = null;
    let combinedHalfWidths = null;
    let combinedHalfHeights = null;
    let vx = null;
    let vy = null;
    //hit will determine whether there's a collision
    hit = false;
    //Find the center points of each sprite
    hitR1.centerX = hitR1.x + hitR1.width / 2;
    hitR1.centerY = hitR1.y + hitR1.height / 2;
    hitR2.centerX = hitR2.x + hitR2.width / 2;
    hitR2.centerY = hitR2.y + hitR2.height / 2;
    //Find the half-widths and half-heights of each sprite
    hitR1.halfWidth = hitR1.width / 2;
    hitR1.halfHeight = hitR1.height / 2;
    hitR2.halfWidth = hitR2.width / 2;
    hitR2.halfHeight = hitR2.height / 2;
    //Calculate the distance vector between the sprites
    vx = hitR1.centerX - hitR2.centerX;
    vy = hitR1.centerY - hitR2.centerY;
    //Figure out the combined half-widths and half-heights
    combinedHalfWidths = hitR1.halfWidth + hitR2.halfWidth;
    combinedHalfHeights = hitR1.halfHeight + hitR2.halfHeight;
    //Check for a collision on the x axis
    if (Math.abs(vx) < combinedHalfWidths) {
      //A collision might be occuring. Check for a collision on the y axis
      if (Math.abs(vy) < combinedHalfHeights) {
        //There's definitely a collision happening
        hit = true;
      } else {
        //There's no collision on the y axis
        hit = false;
      }
    } else {
      //There's no collision on the x axis
      hit = false;
    }
    //`hit` will be either `true` or `false`
    return hit;
  }

  //The `keyboard` helper function
  keyboard(keyCode) {
    const key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function (event) {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    };
    //The `upHandler`
    key.upHandler = function (event) {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    };
    //Attach event listeners
    window.addEventListener('keydown', key.downHandler.bind(key), false);
    window.addEventListener('keyup', key.upHandler.bind(key), false);
    return key;
  }

  onExit(cb) {
    super.onExit(cb);
  }
}

export default LessonsScene;
