import { Container, Sprite, Texture } from 'pixi.js';

export class Flag extends Container {
  private sprite: Sprite;
  constructor() {
    super();
    const texture = Texture.from('flag');

    this.sprite = new Sprite({ texture });
    this.sprite.scale.set(0.8);
    this.sprite.position.x = 24150;
    this.sprite.position.y = 180;
    this.addChild(this.sprite);
  }
}
