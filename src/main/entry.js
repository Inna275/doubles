import { Grid } from '../core/grid.js';
import { GRID_SIZE, KEY_TO_DIRECTION } from '../constants.js';
import { checkGameStatus } from '../gameflow/flow.js';

const grid = new Grid(GRID_SIZE);

const handleKeyDown = (event) => {
  const direction = KEY_TO_DIRECTION[event.key];
  if (!direction) return;

  grid.move(direction);
  if (grid.moved) {
    if (!grid.reached2048) grid.addTile();
    grid.resetMergedFlags();
    grid.resetMoved();
    checkGameStatus(grid);
  }
};

document.addEventListener('keydown', handleKeyDown);
