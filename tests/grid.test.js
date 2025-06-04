import { Grid } from '../src/core/grid.js';
import { Cell } from '../src/core/cell.js';
import { Tile } from '../src/core/tile.js';

describe('Grid', () => {
  const SIZE = 4;
  let gameBoard, grid;

  beforeEach(() => {
    document.body.innerHTML = '';
    gameBoard = document.createElement('div');
    gameBoard.id = 'game-board';
    document.body.appendChild(gameBoard);

    grid = new Grid(SIZE);

    grid.cells.flat().forEach(cell => {
      cell.tile = null;
      cell.element.innerHTML = '';
    });
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
    grid.addStartTiles();
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

  test('moveTile places tile in target cell and clears original', () => {
    const tile = new Tile();
    const cell = grid.cells[0][0];
    const targetCell = grid.cells[0][1];
    cell.placeTile(tile);

    grid.moveTile(cell, targetCell);

    expect(cell.tile).toBe(null);
    expect(targetCell.tile).toBe(tile);
  });

  test('isMergePossible returns true if tiles have same value', () => {
    const tile1 = new Tile();
    const tile2 = new Tile();
    tile1.value = 2;
    tile2.value = 2;

    expect(grid.isMergePossible(tile1, tile2)).toBe(true);
  });

  test('mergeTiles doubles value, updates element, and clears original', () => {
    const tile1 = new Tile();
    const tile2 = new Tile();
    tile1.value = 2;
    tile2.value = 2;

    const cell = grid.cells[0][0];
    const targetCell = grid.cells[0][1];

    cell.placeTile(tile1);
    targetCell.placeTile(tile2);

    grid.mergeTiles(cell, targetCell);

    expect(targetCell.tile.value).toBe(4);
    expect(cell.tile).toBe(null);
    expect(targetCell.tile.merged).toBe(true);
  });

  test('resetMergedFlags resets merged state on all tiles', () => {
    const tile = new Tile();
    tile.markAsMerged();

    const cell = grid.cells[0][0];
    cell.placeTile(tile);

    grid.resetMergedFlags();
    expect(tile.merged).toBe(false);
  });

  test('markAsMoved sets moved to true', () => {
    grid.markAsMoved();
    expect(grid.moved).toBe(true);
  });

  test('resetMoved sets moved to false', () => {
    grid.moved = true;
    grid.resetMoved();
    expect(grid.moved).toBe(false);
  });

  test('moves tile left to empty cell', () => {
    const tile = new Tile();
    grid.cells[0][3].placeTile(tile);

    grid.move('left');

    expect(grid.cells[0][0].tile).toBe(tile);
    expect(grid.cells[0][3].tile).toBe(null);
    expect(grid.moved).toBe(true);
  });

  test('merges two tiles with same value moving left', () => {
    const tile1 = new Tile(); tile1.value = 2;
    const tile2 = new Tile(); tile2.value = 2;

    grid.cells[0][2].placeTile(tile1);
    grid.cells[0][1].placeTile(tile2);

    grid.move('left');

    const mergedTile = grid.cells[0][0].tile;
    expect(mergedTile.value).toBe(4);
    expect(mergedTile.merged).toBe(true);
    expect(grid.cells[0][1].tile).toBe(null);
    expect(grid.cells[0][2].tile).toBe(null);
    expect(grid.moved).toBe(true);
  });

  test('does not merge already merged tile twice in one move', () => {
    const t1 = new Tile(); t1.value = 2;
    const t2 = new Tile(); t2.value = 2;
    const t3 = new Tile(); t3.value = 2;

    grid.cells[0][3].placeTile(t1);
    grid.cells[0][2].placeTile(t2);
    grid.cells[0][1].placeTile(t3);

    grid.move('left');

    expect(grid.cells[0][0].tile.value).toBe(4);
    expect(grid.cells[0][1].tile.value).toBe(2);
    expect(grid.cells[0][2].tile).toBe(null);
    expect(grid.cells[0][3].tile).toBe(null);
  });

  test('does not move or merge tiles if blocked', () => {
    const t1 = new Tile(); t1.value = 2;
    const t2 = new Tile(); t2.value = 4;

    grid.cells[0][0].placeTile(t1);
    grid.cells[0][1].placeTile(t2);

    grid.move('left');

    expect(grid.cells[0][0].tile.value).toBe(2);
    expect(grid.cells[0][1].tile.value).toBe(4);
    expect(grid.moved).toBe(false);
  });

  test('moves tiles up correctly', () => {
    const tile = new Tile(); tile.value = 2;
    grid.cells[3][0].placeTile(tile);

    grid.move('up');

    expect(grid.cells[0][0].tile).toBe(tile);
    expect(grid.cells[3][0].tile).toBe(null);
    expect(grid.moved).toBe(true);
  });

  test('moves tiles right correctly', () => {
    const tile = new Tile(); tile.value = 2;
    grid.cells[0][0].placeTile(tile);

    grid.move('right');

    expect(grid.cells[0][3].tile).toBe(tile);
    expect(grid.cells[0][0].tile).toBe(null);
    expect(grid.moved).toBe(true);
  });

  test('moves tiles down correctly', () => {
    const tile = new Tile(); tile.value = 2;
    grid.cells[0][0].placeTile(tile);

    grid.move('down');

    expect(grid.cells[3][0].tile).toBe(tile);
    expect(grid.cells[0][0].tile).toBe(null);
    expect(grid.moved).toBe(true);
  });
});
