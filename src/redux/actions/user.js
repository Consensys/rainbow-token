import generator from 'mnemonic-generator';
import { call, put, select, takeLatest } from 'redux-saga/effects'

import {
  REQUEST_PLAYING,
  START_PLAYING,
  REQUEST_AUTO_BLEND,
  REQUEST_BLEND,
  GET_USER,
  SET_USER,
  UPDATE_USER_COLOR,
  START_LOADING_USER,
  END_LOADING_USER,
  START_TRANSACTION,
  END_TRANSACTION,
  ADD_ERROR,
  REMOVE_ERROR
} from '../actionTypes';
import rainbow, { web3 } from '../../web3';
import { computeScore } from '../../web3/utils';


/********* ACTIONS *********/

export const getUser = () => ({
  type: GET_USER
});

export const requestPlaying = () => ({
  type: REQUEST_PLAYING
})

export const requestAutoBlend = () => ({
  type: REQUEST_AUTO_BLEND
})

export const requestBlend = (blendingAddress, blendingPrice, blendingR, blendingG, blendingB) => ({
  type: REQUEST_BLEND,
  payload: {
    blendingAddress,
    blendingPrice,
    blendingR,
    blendingG,
    blendingB
  }
})

export const updateUserColor = color => ({
  type: UPDATE_USER_COLOR,
  payload: {
    color,
    score: computeScore(color, rainbow.targetColor),
  }
})

/********* WATCHERS *********/

export function* watchGetUser() {
  yield takeLatest(GET_USER, setUser);
}

export function* watchRequestPlaying() {
  yield takeLatest(REQUEST_PLAYING, startPlaying);
}

export function* watchRequestAutoBlend() {
  yield takeLatest(REQUEST_AUTO_BLEND, autoBlend);
}

export function* watchRequestBlend(otherAddress, otherR, otherG, otherB) {
  yield takeLatest(
    REQUEST_BLEND, 
    ({ blendingAddress, blendingPrice, blendingR, blendingG, blendingB}) => blend(blendingAddress, blendingPrice, blendingR, blendingG, blendingB));
}

/********* WORKERS *********/

function* setUser() {
  try {
    yield put({ type: START_LOADING_USER });
    const [ address, ...others ] = yield call(web3.eth.getAccounts);
    const isPlaying = yield call(rainbow.isPlayer, address);
    const token = yield call(rainbow.getToken, address);
    // const rgbCurrent = yield call(RgbWalletMethods.getCurrentRgb, address);
    // const rgbDefault = yield call(RgbWalletMethods.getDefaultRgb, address);
    const data = { 
      address, 
      pseudo: generator(address), 
      color: token.color,
      defaultColor: token.defaultColor,
      score: computeScore(token, rainbow.targetColor)
    };
    const user = { isPlaying, isLoading: false, data };
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

function* autoBlend() {
  try {
    yield put({ type: START_TRANSACTION });
    const address = yield select(state => state.user.data.address);
    yield call(rainbow.autoBlend, address);
  } catch(err) {
    console.log(err)
    yield put({ type: ADD_ERROR, error: 'Transaction have failed.' });
  } finally {
    yield put({ type: END_TRANSACTION });
  }
}

function* blend(blendingAddress, blendingPrice, blendingR, blendingG, blendingB) {
  try {
    yield put({ type: START_TRANSACTION });
    const address = yield select(state => state.user.data.address);
    yield call(rainbow.blendWithOthers, blendingAddress, blendingPrice, blendingR, blendingG, blendingB);
  } catch(err) {
    console.log(err)
    yield put({ type: ADD_ERROR, error: 'Transaction have failed.' });
  } finally {
    yield put({ type: END_TRANSACTION });
  }
}
