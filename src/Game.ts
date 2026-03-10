import { Application } from 'pixi.js';
import { AssetManager } from './shared/Assets';
import { initDevtools } from '@pixi/devtools';
import { Scene } from './Scene/Scene';
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
    this.app.stage.addChild(this.scene.view, this.spineBoy.view);

    this.spineBoy.spawn();
    this.startLoop();
  }

  private startLoop(): void {
    this.app.ticker.add(() => {
      if (this.spineBoy.isSpawning()) return;

      this.spineBoy.state.jump = this.controller.keys.space.pressed;

      this.spineBoy.update();
    });
  }
}
