import '@esotericsoftware/spine-pixi-v8';
import { Assets } from 'pixi.js';
import skyURL from '../assets/sky.png';
import midgroungURL from '../assets/midground.png';
import mainPlatform from '../assets/main-platform.png';
import backgroundURL from '../assets/background.png';
// import atlasURL from '../assets/spineboy.atlas?url';
// import spineBoyURL from '../assets/spineboy-pro.json?url';

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

  // public get<T>(alias: string): T {
  //   return Assets.get<T>(alias);
  // }
}
