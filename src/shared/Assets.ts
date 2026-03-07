import '@pixi/spine-pixi';
import { Assets } from 'pixi.js';
import skyURL from '../assets/sky.png';
import midgroungURL from '../assets/midground.png';
import metalPlatformURL from '../assets/metal-platform.png';
import mainPlatform from '../assets/main-platform.png';
import backgroundURL from '../assets/background.png';
import atlasURL from '../assets/spineboy-pma.atlas.txt';
import spineBoyURL from '../assets/spineboy-pro.skel?url';

export class AssetManager {
  private initialized: boolean;

  constructor() {
    this.initialized = false;
  }

  public async init(): Promise<void> {
    if (this.initialized) return;

    await Assets.load([
      {
        alias: 'spineBoy',
        src: spineBoyURL,
        data: {
          atlas: atlasURL,
        },
      },
      {
        alias: 'spineBoyAtlas',
        src: atlasURL,
      },
      {
        alias: 'background',
        src: backgroundURL,
      },
      {
        alias: 'mainPlatform',
        src: mainPlatform,
      },
      {
        alias: 'metalPlatform',
        src: metalPlatformURL,
      },
      {
        alias: 'midground',
        src: midgroungURL,
      },
      {
        alias: 'sky',
        src: skyURL,
      },
    ]);

    this.initialized = true;
  }

  public get<T>(alias: string): T {
    return Assets.get<T>(alias);
  }
}
