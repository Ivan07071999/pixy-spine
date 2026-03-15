import '@esotericsoftware/spine-pixi-v8';
import { Assets } from 'pixi.js';
import skyURL from '../assets/sky.png';
import midgroungURL from '../assets/midground.png';
import mainPlatform from '../assets/main-platform.png';
import backgroundURL from '../assets/background.png';
import metalPlatformURL from '../assets/metal-platform.png';

export class AssetManager {
  private initialized: boolean;

  constructor() {
    this.initialized = false;
  }

  public async init(): Promise<void> {
    if (this.initialized) return;

    await Assets.load([
      {
        alias: 'spineAtlas',
        src: '/spineboy/spineboy-pma.atlas',
      },
      {
        alias: 'sky',
        src: skyURL,
      },
      {
        alias: 'background',
        src: backgroundURL,
      },
      {
        alias: 'midground',
        src: midgroungURL,
      },
      {
        alias: 'mainPlatform',
        src: mainPlatform,
      },
      {
        alias: 'metalPlatform',
        src: metalPlatformURL,
      },
    ]);

    await Assets.load({
      alias: 'spineSkeleton',
      src: '/spineboy/spineboy-pro.skel',
      data: {
        atlas: 'spineAtlas',
      },
    });

    this.initialized = true;
  }
}
