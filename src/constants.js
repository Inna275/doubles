const GRID_SIZE = 4;

const TWO_CHANCE = 0.9;

const START_TILES = 2;

const ANIMATION_DELAY = 100;

const LAST_INDEX = GRID_SIZE - 1;

const FIRST_INDEX = 0;

const END_GAME_DELAY = 300;

const TILE_COLORS = {
  2: '#f91e52',
  4: '#fe8b4b',
  8: '#f7df25',
  16: '#98ec29',
  32: '#43e24b',
  64: '#24d39b',
  128: '#2dc2cc',
  256: '#3daaeb',
  512: '#5a84fb',
  1024: '#9037f9',
  2048: '#a024f5',
};

const KEY_TO_DIRECTION = {
  'ArrowUp': 'up',
  'ArrowDown': 'down',
  'ArrowLeft': 'left',
  'ArrowRight': 'right',
};

const MOVE_DATA = {
  'up': {
    start: 1,
    end: GRID_SIZE,
    step: 1,
    isVertical: true,
    isForward: true,
  },

  'down': {
    start: GRID_SIZE - 2,
    end: -1,
    step: -1,
    isVertical: true,
    isForward: false,
  },

  'left': {
    start: 1,
    end: GRID_SIZE,
    step: 1,
    isVertical: false,
    isForward: true,
  },

  'right': {
    start: GRID_SIZE - 2,
    end: -1,
    step: -1,
    isVertical: false,
    isForward: false,
  },
};

const MESSAGES = {
  YOU_WIN: 'Congratulations! You win!',
  GAME_OVER: 'Game over. Try again!',
};

export {
  GRID_SIZE,
  TWO_CHANCE,
  START_TILES,
  ANIMATION_DELAY,
  LAST_INDEX,
  FIRST_INDEX,
  TILE_COLORS,
  KEY_TO_DIRECTION,
  MOVE_DATA,
  END_GAME_DELAY,
  MESSAGES
};
