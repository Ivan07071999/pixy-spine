import { Bounds, Container, Sprite, Texture } from 'pixi.js';

export class Flag extends Container {
  private sprite: Sprite;
  constructor() {
    super();
    const texture = Texture.from('flag');

    this.sprite = new Sprite({ texture });
    this.sprite.scale.set(0.8);
    this.sprite.position.x = 1000;
    this.sprite.position.y = 600;
    this.addChild(this.sprite);
    console.log('FLAG', this.sprite);
  }

  public getBounds(): Bounds {
    console.log('FINISH');
    return this.sprite.getBounds();
  }
}
