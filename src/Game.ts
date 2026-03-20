import { Application, Bounds, Rectangle } from 'pixi.js';
import { AssetManager } from './shared/Assets';
import { initDevtools } from '@pixi/devtools';
import { Scene } from './entities/Scene/Scene';
import { SpineBoy } from './SpineBoy/SpineBoy';
import { Controller } from './entities/Controller';
import { Flag } from './shared/Flag';

export class Game {
  private app: Application;
  private assets: AssetManager;
  private scene!: Scene;
  private spineBoy!: SpineBoy;
  private controller: Controller;
  private flag!: Flag;

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
    this.flag = new Flag();
    this.scene.worldLayer.addChild(this.spineBoy.view, this.flag);

    this.spineBoy.spawn();
    this.startLoop();

    //this.scene.position = -16500;
  }

  private rectIntersect(r1: Bounds | Rectangle, r2: Bounds | Rectangle): boolean {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
  }

  private handleInput(): void {
    const boy = this.spineBoy;
    const keys = this.controller.keys;

    if (keys.space.pressed && boy.isGrounded) boy.jump();

    boy.state.jump = !boy.isGrounded;

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
  }

  private updatePhysics() {
    const boy = this.spineBoy;

    boy.vy += boy.gravity;

    if (boy.vy > 12) boy.vy = 12;

    if (boy.vy < -12) boy.vy = -12;

    boy.view.x += boy.vx;
    boy.view.y += boy.vy;

    if (boy.vy > 0) boy.isGrounded = false;
  }

  private resolvePlatformCollisions() {
    const boy = this.spineBoy;

    const platforms = this.scene.platforms;

    const charBounds = boy.getBounds();

    for (const platform of platforms) {
      const platBounds = platform.getBounds();

      if (this.rectIntersect(charBounds, platBounds)) {
        const overlapX =
          Math.min(charBounds.right, platBounds.right) - Math.max(charBounds.left, platBounds.left);
        const overlapY =
          Math.min(charBounds.bottom, platBounds.bottom) - Math.max(charBounds.top, platBounds.top);

        const charCenterX = charBounds.x + charBounds.width / 2;
        const platCenterX = platBounds.x + platBounds.width / 2;

        const charCenterY = charBounds.y + charBounds.height / 2;
        const platCenterY = platBounds.y + platBounds.height / 2;

        if (overlapX < overlapY) {
          if (charCenterX < platCenterX) {
            boy.view.x -= overlapX;
          } else {
            boy.view.x += overlapX;
          }
          boy.vx = 0;
        } else {
          if (charCenterY < platCenterY) {
            boy.view.y -= overlapY;
            boy.vy = 0;
            boy.isGrounded = true;
          } else {
            boy.view.y += overlapY;
            boy.vy = 0;
          }
        }
      }
    }

    const groundY = this.app.screen.height * 0.82;

    if (boy.view.y > groundY) {
      boy.view.y = groundY;
      boy.vy = 0;
      boy.isGrounded = true;
    }
  }

  private updateCamera() {
    this.scene.position = -this.spineBoy.view.x + this.app.screen.width / 2.5;
  }

  private startLoop(): void {
    this.app.ticker.add(() => {
      if (this.spineBoy.isSpawning()) return;

      this.handleInput();
      this.updatePhysics();
      this.resolvePlatformCollisions();
      this.updateCamera();

      this.spineBoy.update();
    });
  }
}
