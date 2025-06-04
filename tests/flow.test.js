import { jest } from '@jest/globals';
import { checkGameStatus } from '../src/gameflow/flow.js';
import { MESSAGES } from '../src/constants.js';

describe('checkGameStatus', () => {
   let grid;

   beforeAll(() => {
      jest.useFakeTimers();
   });

   beforeEach(() => {
      grid = {
         canMove: jest.fn(),
         reached2048: false,
         clear: jest.fn(),
         resetReached2048: jest.fn(),
         setupGrid: jest.fn(),
      };

      global.alert = jest.fn();
   });

   afterEach(() => {
      jest.clearAllMocks();
      jest.clearAllTimers();
   });

   afterAll(() => {
      jest.useRealTimers();
   });

   test('does nothing if game should not end', () => {
      grid.canMove.mockReturnValue(true);
      grid.reached2048 = false;

      checkGameStatus(grid);

      expect(global.alert).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(global.alert).not.toHaveBeenCalled();
   });

   test('ends game if no moves left', () => {
      grid.canMove.mockReturnValue(false);
      grid.reached2048 = false;

      checkGameStatus(grid);

      jest.runAllTimers();

      expect(global.alert).toHaveBeenCalledWith(MESSAGES.GAME_OVER);
      expect(grid.clear).toHaveBeenCalled();
      expect(grid.resetReached2048).toHaveBeenCalled();
      expect(grid.setupGrid).toHaveBeenCalled();
   });

   test('ends game if reached 2048', () => {
      grid.canMove.mockReturnValue(true);
      grid.reached2048 = true;

      checkGameStatus(grid);

      jest.runAllTimers();

      expect(global.alert).toHaveBeenCalledWith(MESSAGES.YOU_WIN);
      expect(grid.clear).toHaveBeenCalled();
      expect(grid.resetReached2048).toHaveBeenCalled();
      expect(grid.setupGrid).toHaveBeenCalled();
   });
});
