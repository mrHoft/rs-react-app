import { configureStore } from '@reduxjs/toolkit';
import { formSlice } from './form';

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
