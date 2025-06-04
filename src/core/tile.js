import { TWO_CHANCE, TILE_COLORS, ANIMATION_DELAY } from '../constants.js';

class Tile {
   constructor() {
      this.value = Tile.getInitTileNumber();
      this.element = this.createTileElement();
      this.animateAppearance();
      this.merged = false;
   }

   static getInitTileNumber() {
      return Math.random() < TWO_CHANCE ? 2 : 4;
   }

   createTileElement() {
      const element = document.createElement('div');
      element.classList.add('tile');
      element.textContent = this.value;
      element.style.backgroundColor = TILE_COLORS[this.value];
      return element;
   }

   animateAppearance() {
      setTimeout(() => {
         this.element.style.transform = 'scale(1)';
      }, ANIMATION_DELAY);
   }
   
   doubleValue() {
      this.value *= 2;
   }

   updateElement() {
      this.element.textContent = this.value;
      this.element.style.backgroundColor = TILE_COLORS[this.value];
   }

   markAsMerged() {
      this.merged = true;
   }

   resetMerged() {
      this.merged = false;
   }
}

export { Tile };
