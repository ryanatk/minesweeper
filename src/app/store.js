import { configureStore } from '@reduxjs/toolkit';
import gameReducer from 'features/game/slice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});
