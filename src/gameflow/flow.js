import { END_GAME_DELAY, MESSAGES } from '../constants.js';

const checkGameStatus = (grid) => {
   if (shouldEndGame(grid)) {
      setTimeout(() => {
         endGame(grid);
      }, END_GAME_DELAY);
   }
};

const shouldEndGame = (grid) => {
   return !grid.canMove() || grid.reached2048;
};

const endGame = (grid) => {
   showMessage(grid.reached2048);
   resetGame(grid);
};

const showMessage = (won) => {
   const message = getEndGameMessage(won);
   alert(message);
};

const getEndGameMessage = (won) => {
   return won ? MESSAGES.YOU_WIN : MESSAGES.GAME_OVER;
};

const resetGame = (grid) => {
   grid.clear();
   grid.resetReached2048();
   grid.setupGrid();
};

export { checkGameStatus };
