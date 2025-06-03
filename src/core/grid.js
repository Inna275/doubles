import { Cell } from './cell.js';
import { START_TILES } from '../constants.js';

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
    this.addStartTiles();
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

  addTile() {
    const emptyCells = this.findEmptyCells();
    const randomCell = this.getRandomCell(emptyCells);
    randomCell.placeTile();
  }

  findEmptyCells() {
    const emptyCells = [];
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const cell = this.cells[row][col];
        if (cell.isEmpty()) {
          emptyCells.push(cell);
        }
      }
    }

    return emptyCells;
  }

  getRandomCell(cells) {
    const randomIndex = Math.floor(Math.random() * cells.length);
    return cells[randomIndex];
  }

  addStartTiles() {
    for (let i = 0; i < START_TILES; i++) {
      this.addTile();
    }
  }
}

export { Grid };
