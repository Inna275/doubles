import { Tile } from '../src/core/tile.js';
import { TILE_COLORS } from '../src/constants.js';

const hexToRgb = (hex) => {
   const bigint = parseInt(hex.slice(1), 16);
   const r = (bigint >> 16) & 255;
   const g = (bigint >> 8) & 255;
   const b = bigint & 255;

   return `rgb(${r}, ${g}, ${b})`;
};

describe('Tile', () => {
   test('creates a tile element with correct text and background color', () => {
      const tile = new Tile();
      expect(tile.element.classList.contains('tile')).toBe(true);
      expect(tile.element.textContent).toBe(tile.value.toString());

      const expectedColor = hexToRgb(TILE_COLORS[tile.value]);
      expect(tile.element.style.backgroundColor).toBe(expectedColor);
   });

   test('applies scale transform animation after timeout', () => {
      const originalSetTimeout = global.setTimeout;
      let timeoutCalled = false;

      global.setTimeout = (callback) => {
         timeoutCalled = true;
         callback();
      };

      const tile = new Tile();
      expect(timeoutCalled).toBe(true);
      expect(tile.element.style.transform).toBe('scale(1)');

      global.setTimeout = originalSetTimeout;
   });
});
