import { Application } from 'pixi.js';
import { AssetManager } from './shared/Assets';
import { initDevtools } from '@pixi/devtools';
import { Scene } from './entities/Scene/Scene';
import { SpineBoy } from './SpineBoy/SpineBoy';
import { Controller } from './entities/Controller';

export class Game {
  private app: Application;
  private assets: AssetManager;
  private scene!: Scene;
  private spineBoy!: SpineBoy;
  private controller: Controller;

  constructor() {
    this.app = new Application();
    this.assets = new AssetManager();
    this.controller = new Controller();
  }

  public async init(): Promise<void> {
    await this.app.init({
      background: '',
      resizeTo: window,
      antialias: true,
    });

    const width = this.app.screen.width;
    const height = this.app.screen.height;

    const container = document.querySelector('#app');
    container?.appendChild(this.app.canvas);
    await this.assets.init();
    this.scene = new Scene(width, height);
    this.spineBoy = new SpineBoy();

    await initDevtools(this.app);
    this.app.stage.addChild(this.scene.view);
    this.scene.worldLayer.addChild(this.spineBoy.view);

    this.spineBoy.spawn();
    this.startLoop();
  }

  private startLoop(): void {
    this.app.ticker.add(() => {
      if (this.spineBoy.isSpawning()) return;

      this.spineBoy.state.jump = this.controller.keys.space.pressed;

      if (
        (!this.controller.keys.left.doubleTap && this.controller.keys.left.pressed) ||
        (!this.controller.keys.right.doubleTap && this.controller.keys.right.pressed)
      ) {
        this.spineBoy.state.walk =
          this.controller.keys.left.pressed || this.controller.keys.right.pressed;
      } else if (this.controller.keys.left.doubleTap) {
        this.spineBoy.state.run = this.controller.keys.left.doubleTap;
      } else if (this.controller.keys.right.doubleTap) {
        this.spineBoy.state.run = this.controller.keys.right.doubleTap;
      } else {
        this.spineBoy.state.run = false;
        this.spineBoy.state.walk = false;
      }

      if (this.controller.keys.left.pressed) {
        this.spineBoy.direction = -1;
      } else if (this.controller.keys.right.pressed) {
        this.spineBoy.direction = 1;
      }

      if (this.controller.keys.down.pressed) {
        this.spineBoy.state.hover = this.controller.keys.down.pressed;
      } else {
        this.spineBoy.state.hover = false;
      }

      this.spineBoy.update();
      let speed = 0;

      if (this.spineBoy.state.run) {
        speed = 3.5;
      } else if (this.spineBoy.state.hover) {
        speed = 7;
      } else if (this.spineBoy.state.walk) {
        speed = 1.2;
      }

      if (this.spineBoy.state.walk || this.spineBoy.state.run || this.spineBoy.state.hover) {
        this.spineBoy.view.x += speed * this.spineBoy.direction;
      }

      this.scene.position = -this.spineBoy.view.x + this.app.screen.width / 2.5;
    });
  }
}
