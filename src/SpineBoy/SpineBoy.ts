import { Spine } from '@esotericsoftware/spine-pixi-v8';
import { Container, Point } from 'pixi.js';

const animations = {
  idle: {
    name: 'idle',
    loop: true,
  },
  walk: {
    name: 'walk',
    loop: true,
  },
  run: {
    name: 'run',
    loop: true,
  },
  jump: {
    name: 'jump',
    timeScale: 1.5,
  },
  hover: {
    name: 'hoverboard',
    loop: true,
  },
  spawn: {
    name: 'portal',
  },
};

export class SpineBoy {
  view: Container;
  spine: Spine;
  state: { walk: boolean; run: boolean; hover: boolean; jump: boolean };

  constructor() {
    this.state = {
      walk: false,
      run: false,
      hover: false,
      jump: false,
    };
    this.view = new Container({
      position: new Point(screen.width / 2.5, screen.height * 0.72),
      scale: new Point(2, 2),
    });

    this.spine = Spine.from({
      skeleton: 'spineSkeleton',
      atlas: 'spineAtlas',
    });

    this.view.scale.set(0.3);
    this.view.addChild(this.spine);
    this.spine.state.data.defaultMix = 0.2;
    this.spine.skeleton.data.animations.map((animation) =>
      console.log(` Анимация: ${animation.name}, длительность: ${animation.duration}`),
    );
  }

  public spawn(): void {
    this.spine.state.setAnimation(0, animations.spawn.name);
  }

  public playAnimation({
    name,
    loop = false,
    timeScale = 1,
  }: {
    name: string;
    loop: boolean;
    timeScale: number;
  }): void {
    if (this.currentAnimation === name) return;

    const entry = this.spine.state.setAnimation(0, name, loop);
    entry.timeScale = timeScale;
  }

  public update(): void {
    if (this.state.jump) {
      this.playAnimation(animations.jump);
    }
    if (this.isAnimationPlaying(animations.jump)) return;
  }

  private isAnimationPlaying({ name }: { name: string }) {
    return this.currentAnimation === name && !this.spine.state.getCurrent(0)?.isComplete();
  }

  private get currentAnimation(): string | undefined {
    return this.spine.state.getCurrent(0)?.animation?.name;
  }

  public isSpawning() {
    return this.isAnimationPlaying(animations.spawn);
  }
}
