import { Cell } from './cell.js';

class Grid {
  constructor(size) {
    this.size = size;
    this.cells = [];
    this.element = this.createGridElement();
    this.setupGrid();
  }

  createGridElement() {
    const element = document.createElement('div');
    element.id = 'grid';
    return element;
  }

  setupGrid() {
    this.fillWithCells();
    this.addToPage();
  }

  fillWithCells() {
    for (let row = 0; row < this.size; row++) {
      this.cells[row] = [];
      this.fillRow(row);
    }
  }

  fillRow(row) {
    for (let col = 0; col < this.size; col++) {
      this.placeCell(row, col);
    }
  }

  placeCell(row, col) {
    const cell = new Cell();
    this.element.appendChild(cell.element);
    this.cells[row][col] = cell;
  }

  addToPage() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.appendChild(this.element);
  }
}

export { Grid };
