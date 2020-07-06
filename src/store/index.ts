import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import loadingReducer from './loading';
import errorReducer from './error';
import neoReducer from './neo';
import { sagaWatcher } from './sagas';

export type RootState = ReturnType<typeof rootReducer>;
export const isLoading = (state: RootState) => state.loading.isLoading;
export const isLoaded = (state: RootState) => state.loading.isLoaded;
export const getErrorMessage = (state: RootState) => state.errorMessage;
export const getNeoData = (state: RootState) => state.neoData;
export const getLastNeoData = (state: RootState) => state.neoData[state.neoData.length-1];
export const getHazardousNeoData = (state: RootState) =>
  state.neoData.filter(item =>
    item.near_earth_objects[Object.keys(item.near_earth_objects)[0]]
      .filter(el => el.is_potentially_hazardous_asteroid).length !== 0)
      .sort((a,b)  =>
        b.near_earth_objects[Object.keys(b.near_earth_objects)[0]]
          .filter(neo => neo.is_potentially_hazardous_asteroid).length -
        a.near_earth_objects[Object.keys(a.near_earth_objects)[0]]
          .filter(neo => neo.is_potentially_hazardous_asteroid).length
      ).slice(0,2).map(el => el.links.self);

const saga = createSagaMiddleware();

const rootReducer = combineReducers({
  loading: loadingReducer,
  errorMessage: errorReducer,
  neoData: neoReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(saga)),
);

saga.run(sagaWatcher);

export default store;
