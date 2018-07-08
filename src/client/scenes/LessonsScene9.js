import { loader, TextStyle, Text } from 'pixi.js';
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
    //1. Simple text
    const message = new Text('Hello Pixi!');
    //Position it and add it to the stage
    message.position.set(54, 96);
    this.addChild(message);
    //2. Styled text
    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 'white',
      stroke: '#ff3300',
      strokeThickness: 4,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });
    const styledMessage = new Text('Styled Text', style);
    //Position it and add it to the stage
    styledMessage.position.set(54, 128);
    this.addChild(styledMessage);
  }

  onExit(cb) {
    super.onExit(cb);
  }
}

export default LessonsScene;
