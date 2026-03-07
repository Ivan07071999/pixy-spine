import { Spine } from '@pixi/spine-pixi';
import { Container } from 'pixi.js';

export class SpineBoy {
  view: Container;
  spine: Spine;

  constructor() {
    this.view = new Container();
    this.spine = Spine.from({
      skeleton: 'spineBoy',
      atlas: 'spineBoyAtlas',
    });
  }
}
