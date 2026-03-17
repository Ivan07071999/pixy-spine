import { Container, TilingSprite, Texture } from 'pixi.js';
import platformData from '../../shared/firstLvl.json';
import { Platform } from './Platform';

interface PlatformData {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Scene {
  public view: Container;
  public worldLayer: Container;
  public backgroundLayer: Container;
  public platforms: Platform[] = [];
  private background: TilingSprite;
  private midground: TilingSprite;
  private sky: TilingSprite;
  public mainPlatform: TilingSprite;

  constructor(width: number, height: number) {
    this.view = new Container();
    this.backgroundLayer = new Container();
    this.worldLayer = new Container();

    const backgroundTexture = Texture.from('background');
    const skyTexture = Texture.from('sky');
    const mainPlatformTexture = Texture.from('mainPlatform');
    const midgroundTexture = Texture.from('midground');

    this.background = new TilingSprite({
      texture: backgroundTexture,
      width: width,
      height: backgroundTexture.height,
    });
    this.midground = new TilingSprite({
      texture: midgroundTexture,
      width: width,
      height: midgroundTexture.height,
    });

    this.midground.y = mainPlatformTexture.height / 1.1;

    this.mainPlatform = new TilingSprite({
      texture: mainPlatformTexture,
      width: width,
      height: mainPlatformTexture.height,
    });

    this.mainPlatform.y = height - mainPlatformTexture.height;

    this.sky = new TilingSprite({
      texture: skyTexture,
      width: width,
      height: height,
    });

    this.sky.tileScale.set(1.6);
    this.backgroundLayer.addChild(this.sky, this.background, this.midground, this.mainPlatform);
    this.view.addChild(this.backgroundLayer);
    this.view.addChild(this.worldLayer);

    this.createPlatforms();
  }

  public get position(): number {
    // return this.mainPlatform.tilePosition.x;
    return this.worldLayer.x;
  }

  public set position(value: number) {
    this.worldLayer.x = value;
    this.background.tilePosition.x = value * 0.2;
    this.midground.tilePosition.x = value * 0.3;
    this.mainPlatform.tilePosition.x = value;
  }

  private createPlatforms() {
    platformData.data.map((item: PlatformData) => {
      const platform = new Platform(item.x, item.y, item.width, item.height);
      this.worldLayer.addChild(platform);
      this.platforms.push(platform);
    });
    console.log('Загрузили платформы', this.platforms);
  }
}
