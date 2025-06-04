import { Grid } from '../core/grid.js';
import { GRID_SIZE, KEY_TO_DIRECTION } from '../constants.js';

const grid = new Grid(GRID_SIZE);

const handleKeyDown = (event) => {
  const direction = KEY_TO_DIRECTION[event.key];
  if (!direction) {
    return;
  }
  grid.move(direction);
  if (grid.moved) {
    grid.addTile();
    grid.resetMergedFlags();
    grid.resetMoved();
  }
};

document.addEventListener('keydown', handleKeyDown);
