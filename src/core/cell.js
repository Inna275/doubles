import { Tile } from './tile.js';
import { ANIMATION_DELAY } from '../constants.js';

class Cell {
  constructor() {
    this.tile = null;
    this.element = this.createCellElement();
  }

  createCellElement() {
    const element = document.createElement('div');
    element.classList.add('cell');
    return element;
  }

  placeTile(tile = new Tile()) {
    this.tile = tile;
    this.element.appendChild(tile.element);
  }

  isEmpty() {
    return this.tile === null;
  }

  clear() {
    this.tile = null;
    this.element.innerHTML = '';
  }

  animateMerge() {
    this.element.classList.add('tile-merge');
    setTimeout(() => {
      this.element.classList.remove('tile-merge');
    }, ANIMATION_DELAY);
  }
}

export { Cell };
