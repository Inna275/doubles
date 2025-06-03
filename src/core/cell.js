class Cell {
  constructor() {
    this.element = this.createCellElement();
  }

  createCellElement() {
    const element = document.createElement('div');
    element.classList.add('cell');
    return element;
  }
}

export { Cell };
