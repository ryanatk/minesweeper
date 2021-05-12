import { range, shuffle, sortBy, findIndex } from 'lodash';
import { createSlice, current } from '@reduxjs/toolkit';
import { DEFAULT_LEVEL } from 'const';

const getTiles = (rows, cols, bombs) => {
  // build tiles
  const init = range(rows * cols).map((tile, i) => ({
    id: i, // obviously not an ideal "id", but it gives us a simple way to "set bombs"
    x: i % cols,
    y: Math.floor(i / cols),
    isFlipped: false,
  }));

  // set bombs
  const tiles = shuffle(init).map((tile, i) => ({
    ...tile,
    isBomb: i < bombs,
  }));

  // sort by id, to undo the shuffle
  return sortBy(tiles, 'id');
};

const initialState = {
  level: DEFAULT_LEVEL,
  tiles: getTiles(DEFAULT_LEVEL.rows, DEFAULT_LEVEL.cols, DEFAULT_LEVEL.bombs),
  tileCount: DEFAULT_LEVEL.rows * DEFAULT_LEVEL.cols,
  flagsRemaining: DEFAULT_LEVEL.bombs,
  isWon: false,
  isLost: false,
};

export const slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state, { payload }) => {
      const level = payload ?? DEFAULT_LEVEL;

      state.level = level;
      state.tiles = getTiles(level.rows, level.cols, level.bombs);
      state.tileCount = level.rows * level.cols;
      state.flagsRemaining = level.bombs;
      state.isWon = false;
      state.isLost = false;
    },
    addFlag: (state) => {
      state.flagsRemaining = state.flagsRemaining - 1;
    },
    removeFlag: (state) => {
      state.flagsRemaining = state.flagsRemaining + 1;
    },
    flipTile: (state, { payload }) => {
      const { x, y } = payload;
      const { tiles } = current(state);
      const clickedTile = findIndex(
        tiles,
        (tile) => tile.x === x && tile.y === y,
      );

      const number = tiles.filter(
        (tile) =>
          tile.y >= y - 1 &&
          tile.y <= y + 1 &&
          tile.x >= x - 1 &&
          tile.x <= x + 1 &&
          tile.isBomb,
      ).length;

      state.tiles[clickedTile].number = number;
      state.tiles[clickedTile].isFlipped = true;
    },
    checkIfWon: (state) => {
      const flipped = state.tiles.filter(({ isFlipped }) => isFlipped).length;

      state.isWon = state.level.bombs + flipped >= state.tileCount;
    },
    endGame: (state) => {
      state.isLost = true;
    },
  },
});

export const {
  startGame,
  checkIfWon,
  addFlag,
  removeFlag,
  flipTile,
  endGame,
} = slice.actions;

export const selectLevel = (state) => state.game.level;
export const selectTiles = (state) => state.game.tiles;
export const selectFlagsRemaining = (state) => state.game.flagsRemaining;

export default slice.reducer;
