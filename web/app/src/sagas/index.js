import {delay} from 'redux-saga'
import {call, put, takeEvery} from 'redux-saga/effects'


import socketTestSaga from './sockettest'


// TODO use for real cool async transfer and socket

export function* helloSaga() {
  console.log('Hello Saga!')
}

export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({type: 'INCREMENT'})
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield [
    helloSaga(),
    watchIncrementAsync(),
    socketTestSaga()
  ]
}
