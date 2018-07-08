import { loader, Texture, TextStyle, Text, filters, Container, Graphics, Sprite } from 'pixi.js';
import Scene from 'CLIENT/modules/Scene';

class LessonsScene extends Scene {
  constructor({ id }) {
    super({ id });

    this.REEL_WIDTH = 160;
    this.SYMBOL_SIZE = 150;
    this.tweening = [];
    this.slotTextures = [];

    this.onAssetsLoaded = this.onAssetsLoaded.bind(this);
    this.onTicker1 = this.onTicker1.bind(this);
    this.onTicker2 = this.onTicker2.bind(this);

    this.init();
  }

  init() {
    loader
      .add('assets/images/eggHead.png', 'assets/images/eggHead.png')
      .add('assets/images/flowerTop.png', 'assets/images/flowerTop.png')
      .add('assets/images/helmlok.png', 'assets/images/helmlok.png')
      .add('assets/images/skully.png', 'assets/images/skully.png')
      .load(this.onAssetsLoaded);
  }

  onAssetsLoaded() {
  // Create different slot symbols.
    const slotTextures = [
      Texture.fromImage('assets/images/eggHead.png'),
      Texture.fromImage('assets/images/flowerTop.png'),
      Texture.fromImage('assets/images/helmlok.png'),
      Texture.fromImage('assets/images/skully.png')
    ];
    this.slotTextures = slotTextures;

    // Build the reels
    const reels = [];
    this.reels = reels;

    const reelContainer = new Container();
    for (let i = 0; i < 5; i++) {
      const rc = new Container();
      rc.x = i * this.REEL_WIDTH;
      reelContainer.addChild(rc);
      const reel = {
        container: rc,
        symbols: [],
        position: 0,
        previousPosition: 0,
        blur: new filters.BlurFilter()
      };
      reel.blur.blurX = 0;
      reel.blur.blurY = 0;
      rc.filters = [reel.blur];

      // Build the symbols
      for (let j = 0; j < 4; j++) {
        const symbol = new Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
        // Scale the symbol to fit symbol area.
        symbol.y = j * this.SYMBOL_SIZE;
        const scaleXY = Math.min(
          this.SYMBOL_SIZE / symbol.width,
          this.SYMBOL_SIZE / symbol.height
        );
        symbol.scale.x = scaleXY;
        symbol.scale.y = scaleXY;
        symbol.x = Math.round((this.SYMBOL_SIZE - symbol.width) / 2);
        reel.symbols.push(symbol);
        rc.addChild(symbol);
      }
      reels.push(reel);
    }
    this.addChild(reelContainer);

    // Build top & bottom covers and position reelContainer
    const margin = (this.app.screen.height - this.SYMBOL_SIZE * 3) / 2;
    reelContainer.y = margin;
    reelContainer.x = Math.round(this.app.screen.width - this.REEL_WIDTH * 5);
    const top = new Graphics();
    top.beginFill(0, 1);
    top.drawRect(0, 0, this.app.screen.width, margin);
    const bottom = new Graphics();
    bottom.beginFill(0, 1);
    bottom.drawRect(0, this.SYMBOL_SIZE * 3 + margin, this.app.screen.width, margin);

    // Add play text
    const style = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 36,
      fontStyle: 'italic',
      fontWeight: 'bold',
      fill: ['#ffffff', '#00ff99'], // gradient
      stroke: '#4a1850',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440
    });

    const playText = new Text('Spin the wheels!', style);
    playText.x = Math.round((bottom.width - playText.width) / 2);
    playText.y = this.app.screen.height - margin + Math.round((margin - playText.height) / 2);
    bottom.addChild(playText);

    // Add header text
    const headerText = new Text('PIXI MONSTER SLOTS!', style);
    headerText.x = Math.round((top.width - headerText.width) / 2);
    headerText.y = Math.round((margin - headerText.height) / 2);
    top.addChild(headerText);

    this.addChild(top);
    this.addChild(bottom);


    let running = false;


    // Reels done handler.
    const reelsComplete = function reelsComplete() {
      running = false;
    };

    // Function to start playing.
    const startPlay = () => {
      if (running) return;
      running = true;

      for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        const extra = Math.floor(Math.random() * 3);
        this.tweenTo(r, 'position', r.position + 10 + i * 5 + extra, 2500 + i * 600 + extra * 600, this.backout(0.6), null, i === reels.length - 1 ? reelsComplete : null);
      }
    };

    // Set the interactivity.
    bottom.interactive = true;
    bottom.buttonMode = true;
    bottom.addListener('pointerdown', () => {
      startPlay();
    });

    // Listen for animate update.
    this.ticker.add(this.onTicker1);
    // Listen for animate update.
    this.ticker.add(this.onTicker2);
  }

  onTicker1() {
    // Update the slots.
    for (let i = 0; i < this.reels.length; i++) {
      const r = this.reels[i];
      // Update blur filter y amount based on speed.
      // This would be better if calculated with time in mind also.
      // Now blur depends on frame rate.
      r.blur.blurY = (r.position - r.previousPosition) * 8;
      r.previousPosition = r.position;

      // Update symbol positions on reel.
      for (let j = 0; j < r.symbols.length; j++) {
        const s = r.symbols[j];
        const prevy = s.y;
        s.y = (r.position + j) % r.symbols.length * this.SYMBOL_SIZE - this.SYMBOL_SIZE;
        if (s.y < 0 && prevy > this.SYMBOL_SIZE) {
          // Detect going over and swap a texture.
          // This should in proper product be determined from some logical reel.
          s.texture = this.slotTextures[Math.floor(Math.random() * this.slotTextures.length)];
          const scaleXY = Math.min(
            this.SYMBOL_SIZE / s.texture.width,
            this.SYMBOL_SIZE / s.texture.height
          );
          s.scale.x = scaleXY;
          s.scale.y = scaleXY;
          s.x = Math.round((this.SYMBOL_SIZE - s.width) / 2);
        }
      }
    }
  }

  // Very simple tweening utility function.
  // This should be replaced with a proper tweening library in a real product.
  tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
      object,
      property,
      propertyBeginValue: object[property],
      target,
      easing,
      time,
      change: onchange,
      complete: oncomplete,
      start: Date.now()
    };

    this.tweening.push(tween);
    return tween;
  }

  onTicker2() {
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < this.tweening.length; i++) {
      const t = this.tweening[i];
      const phase = Math.min(1, (now - t.start) / t.time);

      t.object[t.property] = this.lerp(t.propertyBeginValue, t.target, t.easing(phase));
      if (t.change) t.change(t);
      if (phase === 1) {
        t.object[t.property] = t.target;
        if (t.complete) { t.complete(t); }
        remove.push(t);
      }
    }
    for (let i = 0; i < remove.length; i++) {
      this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
    }
  }

  // Basic lerp funtion.
  lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
  }

  // Backout function from tweenjs.
  // https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
  backout(amount) {
    return function(t) {
      let backoutT = t;
      return (--backoutT * backoutT * ((amount + 1) * backoutT + amount) + 1);
    };
  }

  onExit(cb) {
    super.onExit(cb);
  }
}

export default LessonsScene;
