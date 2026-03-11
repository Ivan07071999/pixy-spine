import { Container, TilingSprite, Texture } from 'pixi.js';

export class Scene {
  public view: Container;
  private background: TilingSprite;
  private midground: TilingSprite;
  private sky: TilingSprite;
  private mainPlatform: TilingSprite;

  constructor(width: number, height: number) {
    this.view = new Container();

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
    this.view.addChild(this.sky, this.background, this.midground, this.mainPlatform);
  }

  public get position(): number {
    return this.mainPlatform.tilePosition.x;
  }

  public set position(value: number) {
    this.background.tilePosition.x = value * 0.2;
    this.midground.tilePosition.x = value * 0.3;
    this.mainPlatform.tilePosition.x = value;
  }
}
