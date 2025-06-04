import { jest } from '@jest/globals';
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

  test('clear removes tile and empties innerHTML', () => {
    const cell = new Cell();
    const tile = new Tile();
    cell.placeTile(tile);
    cell.clear();

    expect(cell.tile).toBe(null);
    expect(cell.element.innerHTML).toBe('');
  });

  test('animateMerge adds and removes "tile-merge" class', () => {
    const cell = new Cell();
    jest.useFakeTimers();

    cell.animateMerge();
    expect(cell.element.classList.contains('tile-merge')).toBe(true);

    jest.advanceTimersByTime(100);
    expect(cell.element.classList.contains('tile-merge')).toBe(false);

    jest.useRealTimers();
  });
});
