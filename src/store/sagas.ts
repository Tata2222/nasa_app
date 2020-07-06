import { takeEvery, put, call, select, all } from 'redux-saga/effects';
import { FETCH_NEO_DATA, addNeoData, reloadNeoData } from './neo';
import { getLastNeoData, getHazardousNeoData } from './index';
import { startLoading, finishLoading } from './loading';
import { setErrorMessage } from './error';
import { fetchAsteroids } from '../helpers/api';

const today = new Date().toISOString().slice(0,10);

export function* sagaWatcher() {
  yield takeEvery( FETCH_NEO_DATA, sagaWorker);
}

function* sagaWorker() {
  let isToday = false;

  while(true) {
    let requestedNeoData: DataPerDay[] = [];
    const lastNeoData: DataPerDay = yield select(getLastNeoData);
    const hazardousNeoData: string[] = yield select(getHazardousNeoData);

    if(lastNeoData) {
      isToday = lastNeoData.links.prev.includes(today);
    }

    yield put(setErrorMessage(''));
    yield put(startLoading());

    try {
      requestedNeoData = yield all([
        (!lastNeoData || isToday)
          ? call(()=>fetchAsteroids())
          :call(()=>fetchAsteroids(lastNeoData.links.next)),
        call(()=>fetchAsteroids(hazardousNeoData[0])),
        call(()=>fetchAsteroids(hazardousNeoData[1]))
      ]);
    } catch(e) {
      yield put(finishLoading());
      yield put(setErrorMessage(`Something went wrong: ${e}`));
      return
    }
    yield put(finishLoading());
    yield put(addNeoData(requestedNeoData[0]));
    yield put(reloadNeoData(requestedNeoData[1]));
    yield put(reloadNeoData(requestedNeoData[2]));
    yield call(delay, 5000);
  }
}

function delay(duration: number) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), duration)
  })
  return promise
}





