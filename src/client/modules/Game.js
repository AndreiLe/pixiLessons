import SceneManager from 'CLIENT/managers/SceneManager';
import InputManager from 'CLIENT/managers/InputManager';
import LessonsScene from 'CLIENT/scenes/LessonsScene12';
import scenes from 'CLIENT/constants/scenes';
import actions from 'client/constants/actions';
import keys from 'client/constants/keys';

class Game {
  constructor(app) {
    this.app = app;
  }

  init() {
    const myApp = this.app;

    this._inputManager = new InputManager().addActions({
      [actions.SHIFT_UP]: [keys.ARROW_UP],
      [actions.SHIFT_DOWN]: [keys.ARROW_DOWN],
      [actions.SHIFT_LEFT]: [keys.ARROW_LEFT],
      [actions.SHIFT_RIGHT]: [keys.ARROW_RIGHT]
    });

    this._sceneManager = new SceneManager({ myApp })
      .addScenes({
        [scenes.LESSONS]: LessonsScene
      })
      .loadScene(scenes.LESSONS);
  }
}

export default Game;
