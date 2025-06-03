import { Cell } from '../src/core/cell.js';
import { Tile } from '../src/core/tile.js';

describe('Cell', () => {
  test('creates a div with class "cell"', () => {
    const cell = new Cell();
    expect(cell.element).toBeInstanceOf(HTMLElement);
    expect(cell.element.tagName).toBe('DIV');
    expect(cell.element.classList.contains('cell')).toBe(true);
  });

  test('isEmpty returns true initially', () => {
    const cell = new Cell();
    expect(cell.isEmpty()).toBe(true);
  });

  test('placeTile adds a tile and sets tile reference', () => {
    const cell = new Cell();
    const tile = new Tile();
    cell.placeTile(tile);
    expect(cell.tile).toBe(tile);
    expect(cell.element.contains(tile.element)).toBe(true);
  });

  test('isEmpty returns false after placing a tile', () => {
    const cell = new Cell();
    cell.placeTile(new Tile());
    expect(cell.isEmpty()).toBe(false);
  });
});
