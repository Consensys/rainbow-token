import generator from 'mnemonic-generator';
import { call, put, select, takeLatest } from 'redux-saga/effects'

import {
  REQUEST_PLAYING,
  START_PLAYING,
  REQUEST_BLEND,
  GET_USER,
  SET_USER,
  START_LOADING_USER,
  END_LOADING_USER,
  START_TRANSACTION,
  END_TRANSACTION,
  ADD_ERROR,
  REMOVE_ERROR
} from '../actionTypes';
import { web3 } from '../../web3';

/********* ACTIONS *********/

export const getUser = () => ({
  type: GET_USER
});

export const requestPlaying = () => ({
  type: REQUEST_PLAYING
})

export const requestBlend = (
  blendingAddress=undefined, 
  blendingToken=undefined
) => ({
  type: REQUEST_BLEND,
  payload: {
    blendingAddress,
    blendingToken,
  }
})

/********* WATCHERS *********/

export function* watchGetUser() {
  yield takeLatest(GET_USER, getUser);
}

export function* watchRequestPlaying() {
  yield takeLatest(REQUEST_PLAYING, startPlaying);
}

export function* watchRequestAutoBlend() {
  yield takeLatest(REQUEST_AUTO_BLEND, autoBlend);
}

export function* watchRequestBlend() {
  yield takeLatest(
    REQUEST_BLEND,
    ({payload: { blendingAddress, blendingToken }}) => blend(blendingAddress, blendingToken));
}

/********* WORKERS *********/

function* getUser() {
  try {
    yield put({ type: START_LOADING_USER });
    const [ address, ...others ] = yield call(web3.eth.getAccounts);
    const user = { 
      address, 
      pseudo: generator(address), 
    };
    yield put({ type: SET_USER, payload: user });
    yield put({ type: REMOVE_ERROR });
  } catch(err) {
    yield put({ type: ADD_ERROR, error: 'Unable to access an account.' });
  } finally {
    yield put({ type: END_LOADING_USER });
  }
}

function* startPlaying() {
  try {
    yield put({ type: START_TRANSACTION });
    const address = yield select(state => state.user.data.address);
    yield call(rainbow.play, address);
    yield put({ type: START_PLAYING });
  } catch(err) {
    yield put({ type: ADD_ERROR, error: 'Unable to join the game.' });
  } finally {
    yield put({ type: END_TRANSACTION });
  }
}

function* blend(blendingAddress, blendingToken) {
  try {
    yield put({ type: START_TRANSACTION });
    const address = yield select(state => state.user.data.address);
    yield call(rainbow.blend, address, blendingAddress, blendingToken);
  } catch(err) {
    console.log(err)
    yield put({ type: ADD_ERROR, error: 'Transaction has failed.' });
  } finally {
    yield put({ type: END_TRANSACTION });
  }
}
