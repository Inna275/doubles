import { Grid } from '../src/core/grid.js';
import { Cell } from '../src/core/cell.js';

describe('Grid', () => {
  const SIZE = 4;
  let gameBoard, grid;

  beforeEach(() => {
    document.body.innerHTML = '';
    gameBoard = document.createElement('div');
    gameBoard.id = 'game-board';
    document.body.appendChild(gameBoard);

    grid = new Grid(SIZE);
  });

  test('creates grid element with correct ID', () => {
    expect(grid.element).toBeInstanceOf(HTMLElement);
    expect(grid.element.tagName).toBe('DIV');
    expect(grid.element.id).toBe('grid');
  });

  test('adds grid element to game board', () => {
    expect(gameBoard.contains(grid.element)).toBe(true);
  });

  test(`creates ${SIZE}x${SIZE} cells array`, () => {
    expect(grid.cells.length).toBe(SIZE);
    for (let row = 0; row < SIZE; row++) {
      expect(grid.cells[row].length).toBe(SIZE);
      for (let col = 0; col < SIZE; col++) {
        expect(grid.cells[row][col]).toBeInstanceOf(Cell);
      }
    }
  });

  test(`appends ${SIZE * SIZE} cell elements to the grid element`, () => {
    const cells = grid.element.querySelectorAll('.cell');
    expect(cells.length).toBe(SIZE * SIZE);
  });
});
