import { Tile } from './tile.js';

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
}

export { Cell };
