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

  test('start tiles have valid values (2 or 4)', () => {
    const validValues = [2, 4];

    for (let row = 0; row < grid.size; row++) {
      for (let col = 0; col < grid.size; col++) {
        const cell = grid.cells[row][col];
        if (!cell.isEmpty()) {
          const tileValue = cell.tile.value;
          expect(validValues).toContain(tileValue);
        }
      }
    }
  });

  test('finds all empty cells after init (2 tiles placed)', () => {
    const emptyCells = grid.findEmptyCells();
    expect(emptyCells.length).toBe(SIZE * SIZE - 2);
  });

  test('finds all empty cells in cleared grid', () => {
    grid.cells.flat().forEach(cell => cell.tile = null);
    const emptyCells = grid.findEmptyCells();
    expect(emptyCells.length).toBe(SIZE * SIZE);
  });

  test('getRandomCell returns a cell from the list', () => {
    const emptyCells = grid.findEmptyCells();
    const randomCell = grid.getRandomCell(emptyCells);
    expect(emptyCells).toContain(randomCell);
  });
});
