import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { swAPI } from './starships';

export const store = configureStore({
  reducer: {
    [swAPI.reducerPath]: swAPI.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(swAPI.middleware),
});

setupListeners(store.dispatch);
