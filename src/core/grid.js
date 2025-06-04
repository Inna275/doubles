import { Cell } from './cell.js';
import { START_TILES, MOVE_DATA, LAST_INDEX, FIRST_INDEX } from '../constants.js';

class Grid {
  constructor(size) {
    this.size = size;
    this.cells = [];
    this.element = this.createGridElement();
    this.setupGrid();
    this.moved = false;
    this.reached2048 = false;
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

  moveTile(cell, targetCell) {
    targetCell.placeTile(cell.tile);
    cell.clear();
  }

  isMergePossible(currentTile, targetTile) {
    return targetTile.value === currentTile.value;
  }

  mergeTiles(cell, targetCell) {
    const targetTile = targetCell.tile;
    targetTile.doubleValue();
    targetTile.updateElement();
    this.checkReached2048(targetTile.value);
    targetTile.markAsMerged();
    targetCell.animateMerge();
    cell.clear();
  }

  resetMergedFlags() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const cell = this.cells[row][col];
        if (!cell.isEmpty()) {
          cell.tile.resetMerged();
        }
      }
    }
  }

  markAsMoved() {
    this.moved = true;
  }

  resetMoved() {
    this.moved = false;
  }

  move(direction) {
    const { start, end, step, isVertical, isForward } = MOVE_DATA[direction];

    for (let i = start; i !== end; i += step) {
      for (let j = 0; j < this.size; j++) {
        const cell = isVertical ? this.cells[i][j] : this.cells[j][i];
        if (!cell.isEmpty()) {
          this.processTile(i, j, isVertical, isForward);
        }
      }
    }
  }

  processTile(i, j, isVertical, isForward) {
    let currentPos = i;
    const next = isForward ? -1 : 1;

    const getCell = (pos) => isVertical ? this.cells[pos][j] : this.cells[j][pos];

    const isWithinBounds = (pos) => isForward ? pos > FIRST_INDEX : pos < LAST_INDEX;

    const canSlide = (pos) => isWithinBounds(pos) && getCell(pos + next).isEmpty();

    const shouldMerge = (pos) => {
      if (!isWithinBounds(pos)) return false;
      const currentTile = getCell(pos).tile;
      const nextTile = getCell(pos + next).tile;
      return this.isMergePossible(currentTile, nextTile) &&
        !nextTile.merged;
    };

    while (canSlide(currentPos)) {
      this.moveTile(getCell(currentPos), getCell(currentPos + next));
      currentPos += next;
      this.markAsMoved()
    }

    if (shouldMerge(currentPos)) {
      this.mergeTiles(getCell(currentPos), getCell(currentPos + next));
      this.markAsMoved()
    }
  }

  checkReached2048(value) {
    if (value === 2048) this.reached2048 = true;
  }

  canMove() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        const currentCell = this.cells[row][col];

        if (currentCell.isEmpty()) return true;

        const canMergeRight = this.canMergeRight(row, col, currentCell);
        const canMergeDown = this.canMergeDown(row, col, currentCell);
        
        if (canMergeRight || canMergeDown) return true;
      }
    }

    return false;
  }

  canMergeRight(row, col, currentCell) {
    if (col < LAST_INDEX) {
      const rightCell = this.cells[row][col + 1];
      const mergePossible = this.isMergePossible(currentCell.tile, rightCell.tile);
      return rightCell.tile && mergePossible;
    }
    return false;
  }

  canMergeDown(row, col, currentCell) {
    if (row < LAST_INDEX) {
      const downCell = this.cells[row + 1][col];
      const mergePossible = this.isMergePossible(currentCell.tile, downCell.tile);
      return downCell.tile && mergePossible;
    }
    return false;
  }

  resetReached2048() {
    this.reached2048 = false;
  }

  clear() {
    this.element.innerHTML = '';
    this.cells = [];
  }
}

export { Grid };
