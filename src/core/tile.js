import { TWO_CHANCE, TILE_COLORS } from '../constants.js';

class Tile {
   constructor() {
      this.value = this.getInitTileNumber();
      this.element = this.createTileElement();
      this.animate_appearance();
   }

   getInitTileNumber() {
      return Math.random() < TWO_CHANCE ? 2 : 4;
   }

   createTileElement() {
      const element = document.createElement('div');
      element.classList.add('tile');
      element.textContent = this.value;
      element.style.backgroundColor = TILE_COLORS[this.value];
      return element;
   }

   animate_appearance() {
      setTimeout(() => {
         this.element.style.transform = 'scale(1)';
      }, 100);
   }
}

export { Tile };
