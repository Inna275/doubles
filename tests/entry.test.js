import { jest } from '@jest/globals';
import { Grid } from '../src/core/grid.js';
import { GRID_SIZE, KEY_TO_DIRECTION } from '../src/constants.js';

describe('Entry', () => {
  let grid;

  const handleKeyDown = (e) => {
    const direction = KEY_TO_DIRECTION[e.key];
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

  beforeEach(() => {
    document.body.innerHTML = '<div id="game-board"></div>';
    grid = new Grid(GRID_SIZE);

    jest.spyOn(grid, 'move').mockImplementation(() => {
      grid.markAsMoved();
    });
    jest.spyOn(grid, 'addTile');
    jest.spyOn(grid, 'resetMergedFlags');
    jest.spyOn(grid, 'resetMoved');

    document.addEventListener('keydown', handleKeyDown);
  });

  afterEach(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });

  test('calls grid.move and tile methods on valid key press when moved', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    document.dispatchEvent(event);

    expect(grid.move).toHaveBeenCalledWith('up');
    expect(grid.addTile).toHaveBeenCalled();
    expect(grid.resetMergedFlags).toHaveBeenCalled();
    expect(grid.resetMoved).toHaveBeenCalled();
  });

  test('does not call tile methods if not moved', () => {
    grid.move.mockImplementation(() => {});

    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    document.dispatchEvent(event);

    expect(grid.addTile).not.toHaveBeenCalled();
    expect(grid.resetMergedFlags).not.toHaveBeenCalled();
    expect(grid.resetMoved).not.toHaveBeenCalled();
  });
});