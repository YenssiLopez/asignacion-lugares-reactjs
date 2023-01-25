import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { pointsSlice } from './places';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    points : pointsSlice.reducer,
  },
});