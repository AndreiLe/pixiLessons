import { loader, Graphics } from 'pixi.js';
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
    //Circle
    const circle = new Graphics();
    circle.beginFill(0x9966FF);
    circle.drawCircle(0, 0, 32);
    circle.endFill();
    circle.x = 64;
    circle.y = 130;
    this.addChild(circle);
    //Rectangle
    const rectangle = new Graphics();
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.beginFill(0x66CCFF);
    rectangle.drawRect(0, 0, 64, 64);
    rectangle.endFill();
    rectangle.x = 170;
    rectangle.y = 170;
    this.addChild(rectangle);
    //Line
    const line = new Graphics();
    line.lineStyle(4, 0xFFFFFF, 1);
    line.moveTo(0, 0);
    line.lineTo(80, 50);
    line.x = 32;
    line.y = 32;
    this.addChild(line);
    //Ellipse
    const ellipse = new Graphics();
    ellipse.beginFill(0xFFFF00);
    ellipse.drawEllipse(0, 0, 50, 20);
    ellipse.endFill();
    ellipse.x = 180;
    ellipse.y = 130;
    this.addChild(ellipse);
    //Triangle
    const triangle = new Graphics();
    triangle.beginFill(0x66FF33);
    //Use `drawPolygon` to define the triangle as an
    //array of x/y positions
    triangle.drawPolygon([
      -32, 64,
      //First point
      32, 64,
      //Second point
      0, 0
      //Third point
    ]);
    triangle.endFill();
    //Position the triangle after you've drawn it.
    //The triangle's x/y position is anchored to its first point in the path
    triangle.x = 180;
    triangle.y = 22;
    this.addChild(triangle);
    //Rounded rectangle
    const roundBox = new Graphics();
    roundBox.lineStyle(4, 0x99CCFF, 1);
    roundBox.beginFill(0xFF9933);
    roundBox.drawRoundedRect(0, 0, 84, 36, 10);
    roundBox.endFill();
    roundBox.x = 48;
    roundBox.y = 190;
    this.addChild(roundBox);
  }

  onExit(cb) {
    super.onExit(cb);
  }
}

export default LessonsScene;
