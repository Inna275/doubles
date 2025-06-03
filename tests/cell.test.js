import { Cell } from '../src/core/cell.js';

describe('Cell', () => {
  test('creates a div with class "cell"', () => {
    const cell = new Cell();
    expect(cell.element).toBeInstanceOf(HTMLElement);
    expect(cell.element.tagName).toBe('DIV');
    expect(cell.element.classList.contains('cell')).toBe(true);
  });
});
