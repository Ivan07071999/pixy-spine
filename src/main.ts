import { Game } from './Game';
import './style.css';

void (async () => {
  const game = new Game();

  await game.init();
})();
