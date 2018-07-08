import { Application, settings } from 'pixi.js';
import colors from 'CLIENT/constants/colors';

const VERSION = '1';

settings.RESOLUTION = window.devicePixelRatio;

const app = new Application({
  antialias: true,
  backgroundColor: colors.BACKGROUND,
  resolution: settings.RESOLUTION,
  transparent: false
});

const version = document.createElement('div');
version.innerHTML = `v.${VERSION}`;
version.classList.add('version');

document.body.append(app.view);
document.body.append(version);

app.renderer.view.style.display = 'block';
app.renderer.view.style.position = 'absolute';
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
});

export default app;
