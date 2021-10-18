import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState, getPeople } from '@starwars/swapi-data-access';

export const PEOPLE_FEATURE_KEY = 'people';

/*
 * Update these interfaces according to your requirements.
 */
export interface PeopleEntity {
  id: number;
  name: string;
  gender: string;
}

export interface PeopleState extends EntityState<PeopleEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
  currentPage: number;
  pagesCount: number;
}

export const peopleAdapter = createEntityAdapter<PeopleEntity>({ selectId: (person: PeopleEntity) => person.name });

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchPeople())
 * }, [dispatch]);
 * ```
 */
export const fetchPeople = createAsyncThunk(
  'people/fetchStatus',
  async (page: number, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getPeoples()`;
     * Right now we just return an empty array.
     */
    const people: PeopleEntity[] = await getPeople(page);
    return people;
  }
);

export const initialPeopleState: PeopleState = peopleAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: '',
  currentPage: 1,
  pagesCount: 0
});

export const peopleSlice = createSlice({
  name: PEOPLE_FEATURE_KEY,
  initialState: initialPeopleState,
  reducers: {
    add: peopleAdapter.addOne,
    remove: peopleAdapter.removeOne,
    nextPage: (state: PeopleState) => {
     state.currentPage++;
    },
    prevPage: (state: PeopleState) => {
     state.currentPage--;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state: PeopleState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchPeople.fulfilled,
        (state: PeopleState, action: PayloadAction<PeopleEntity[]>) => {
          peopleAdapter.upsertMany(state, action.payload);
          state.loadingStatus = 'loaded';
          state.pagesCount++;
        }
      )
      .addCase(fetchPeople.rejected, (state: PeopleState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message || '';
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const peopleReducer = peopleSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(peopleActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const peopleActions = peopleSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllPeople);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = peopleAdapter.getSelectors();

export const getPeopleState = (rootState: RootState): PeopleState =>
  rootState[PEOPLE_FEATURE_KEY];

export const selectAllPeople = createSelector(getPeopleState, selectAll);

export const selectPeopleEntities = createSelector(
  getPeopleState,
  selectEntities
);

export const selectPeopleStatus = createSelector(
  getPeopleState,
  (state: PeopleState) => state.loadingStatus
);

export const selectCurrentPage = createSelector(
  getPeopleState,
  (state: PeopleState) => state.currentPage
)

export const selectPagesCount = createSelector(
  getPeopleState,
  (state: PeopleState) => state.pagesCount
)
