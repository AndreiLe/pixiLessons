import { loader, Graphics, Sprite } from 'pixi.js';
import Scene from 'CLIENT/modules/Scene';
import assets from 'CLIENT/assets';

class LessonsScene extends Scene {
  constructor({ id }) {
    super({ id });

    this.init();

    this.onButtonUp = this.onButtonUp.bind(this);
    this.onButtonDown = this.onButtonDown.bind(this);
    this.onButtonOver = this.onButtonOver.bind(this);
    this.onButtonOut = this.onButtonOut.bind(this);
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
    // create some textures from an image path
    // const textureButton = PIXI.Texture.fromImage('https://dl.dropboxusercontent.com/s/mi2cibdajml8qj9/arrow_wait.png?dl=0');
    const textureButton = new Graphics();
    textureButton.lineStyle(4, 0xFF3300, 1);
    textureButton.beginFill(0x0000FF);
    textureButton.drawRect(0, 0, 64, 64);
    textureButton.endFill();
    textureButton.x = 170;
    textureButton.y = 170;
    this.textureButton = textureButton.generateTexture();

    // const textureButtonDown = PIXI.Texture.fromImage('https://dl.dropboxusercontent.com/s/m0x11c91wazehyp/arrow_error.png?dl=0');
    const textureButtonDown = new Graphics();
    textureButtonDown.lineStyle(4, 0xFF3300, 1);
    textureButtonDown.beginFill(0xFF0000);
    textureButtonDown.drawRect(0, 0, 64, 64);
    textureButtonDown.endFill();
    textureButtonDown.x = 170;
    textureButtonDown.y = 170;
    this.textureButtonDown = textureButtonDown.generateTexture();

    // const textureButtonOver = PIXI.Texture.fromImage('https://dl.dropboxusercontent.com/s/1kuhddt8p9tr0k8/arrow_wait.png?dl=0');
    const textureButtonOver = new Graphics();
    textureButtonOver.lineStyle(4, 0xFF3300, 1);
    textureButtonOver.beginFill(0xFFFFFF);
    textureButtonOver.drawRect(0, 0, 64, 64);
    textureButtonOver.endFill();
    textureButtonOver.x = 170;
    textureButtonOver.y = 170;
    this.textureButtonOver = textureButtonOver.generateTexture();

    const button = new Sprite(textureButton.generateTexture());
    button.buttonMode = true;
    button.anchor.set(0.5);
    button.x = 200;
    button.y = 200;
    // make the button interactive...
    button.interactive = true;
    button.buttonMode = true;

    // Mouse & touch events are normalized into
    // the pointer* events for handling different
    // button events.
    button
      .on('pointerdown', this.onButtonDown)
      .on('pointerup', this.onButtonUp)
      .on('pointerupoutside', this.onButtonUp)
      .on('pointerover', this.onButtonOver)
      .on('pointerout', this.onButtonOut);

    this.button = button;

    // Use mouse-only events
    // .on('mousedown', this.onButtonDown)
    // .on('mouseup', this.onButtonUp)
    // .on('mouseupoutside', this.onButtonUp)
    // .on('mouseover', this.onButtonOver)
    // .on('mouseout', this.onButtonOut)

    // Use touch-only events
    // .on('touchstart', this.onButtonDown)
    // .on('touchend', this.onButtonUp)
    // .on('touchendoutside', this.onButtonUp)

    // add it to the stage
    this.addChild(button);
  }

  onButtonDown() {
    this.isdown = true;
    this.button.texture = this.textureButtonDown;
    this.alpha = 1;
  }

  onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
      this.button.texture = this.textureButtonOver;
    } else {
      this.button.texture = this.textureButton;
    }
  }

  onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
      return;
    }
    this.button.texture = this.textureButtonOver;
  }

  onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
      return;
    }
    this.button.texture = this.textureButton;
  }

  onExit(cb) {
    super.onExit(cb);
  }
}

export default LessonsScene;
