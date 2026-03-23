export interface IKey {
  pressed: boolean;
  doubleTap: boolean;
  timestamp: number;
}

export interface IKeys {
  up: IKey;
  right: IKey;
  space: IKey;
  left: IKey;
  down: IKey;
}

export interface PlatformData {
  x: number;
  y: number;
  width: number;
  height: number;
}
