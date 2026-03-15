import { Container, Rectangle, Texture, TilingSprite } from 'pixi.js';

export class Platform extends Container {
  public bounds: Rectangle;
  public sprite: TilingSprite;

  constructor(x: number, y: number, width: number, height: number) {
    super();

    const texture = Texture.from('metalPlatform');
    console.log('Текстура', texture);

    this.sprite = new TilingSprite({
      texture,
      width,
      height,
    });

    this.addChild(this.sprite);

    this.x = x;
    this.y = y;

    this.bounds = new Rectangle(x, y, width, height);
  }
}
