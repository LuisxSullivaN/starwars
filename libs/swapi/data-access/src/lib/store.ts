import { configureStore } from '@reduxjs/toolkit';

import { PEOPLE_FEATURE_KEY, peopleReducer } from '@starwars/swapi-data-access';

export const store = configureStore({
  reducer: { [PEOPLE_FEATURE_KEY]: peopleReducer },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
