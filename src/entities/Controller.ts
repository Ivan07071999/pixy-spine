interface IKey {
  pressed: boolean;
  doubleTap: boolean;
  timestamp: number;
}

interface IKeys {
  up: IKey;
  right: IKey;
  space: IKey;
  left: IKey;
  down: IKey;
}

const keyMap: Record<string, keyof IKeys> = {
  KeyD: 'right',
  ArrowRight: 'right',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyS: 'down',
  ArrowDown: 'down',
  Space: 'space',
};

export class Controller {
  keys: IKeys;
  constructor() {
    this.keys = {
      up: { pressed: false, doubleTap: false, timestamp: 0 },
      right: { pressed: false, doubleTap: false, timestamp: 0 },
      left: { pressed: false, doubleTap: false, timestamp: 0 },
      down: { pressed: false, doubleTap: false, timestamp: 0 },
      space: { pressed: false, doubleTap: false, timestamp: 0 },
    };
    window.addEventListener('keydown', (event) => this.handleKeyDown(event));
    window.addEventListener('keyup', (event) => this.handleKeyUp(event));
  }

  handleKeyDown(event: KeyboardEvent): void {
    const key = keyMap[event.code];

    if (!key) return;
    console.log('Нажали', event.code);

    const now = Date.now();

    this.keys[key].doubleTap = this.keys[key].doubleTap || now - this.keys[key].timestamp < 300;
    this.keys[key].pressed = true;
  }

  public handleKeyUp(event: KeyboardEvent): void {
    const key = keyMap[event.code];

    if (!key) return;
    console.log('Отпустили', event.code);

    const now = Date.now();
    this.keys[key].pressed = false;

    if (this.keys[key].doubleTap) {
      this.keys[key].doubleTap = false;
    } else {
      this.keys[key].timestamp = now;
    }
  }
}
