import {
  REQUEST_PLAYING,
  START_PLAYING,
  REQUEST_BLEND_WITH_SELF,
  REQUEST_BLEND_WITH_OTHER,
  FETCH_USER,
  SET_USER,
  UPDATE_USER_RGB,
  START_LOADING_USER,
  END_LOADING_USER,
  START_TRANSACTION,
  END_TRANSACTION,
  ADD_ERROR,
  REMOVE_ERROR
} from '../actionTypes';

import generator from 'mnemonic-generator';

import { web3, RgbWalletMethods } from '../../util/connectors';

import { call, put, select, takeLatest } from 'redux-saga/effects'

/********* ACTIONS *********/

export const fetchUser = () => ({
  type: FETCH_USER
});

export const requestPlaying = () => ({
  type: REQUEST_PLAYING
})

export const requestBlendWithSelf = () => ({
  type: REQUEST_BLEND_WITH_SELF
})

export const requestBlendWithOthers = (otherAddress, otherR, otherG, otherB) => ({
  type: REQUEST_BLEND_WITH_OTHER,
  otherAddress,
  otherR,
  otherG,
  otherB
})

export const updateUserRgb = updatedRGB => ({
  type: UPDATE_USER_RGB,
  updatedRGB
})

/********* WATCHERS *********/

export function* watchFetchingUser() {
  yield takeLatest(FETCH_USER, setUser);
}

export function* watchRequestPlaying() {
  yield takeLatest(REQUEST_PLAYING, startPlaying);
}

export function* watchRequestBlendingWithSelf() {
  yield takeLatest(REQUEST_BLEND_WITH_SELF, blendWithSelf);
}

export function* watchRequestBlendingWithOthers(otherAddress, otherR, otherG, otherB) {
  yield takeLatest(REQUEST_BLEND_WITH_OTHER, ({ otherAddress, otherR, otherG, otherB }) => blendWithOthers(otherAddress, otherR, otherG, otherB));
}

/********* WORKERS *********/

function* setUser() {
  try {
    yield put({ type: START_LOADING_USER });
    const [ address, ...others ] = yield call(web3.eth.getAccounts);
    const isPlaying = yield call(RgbWalletMethods.isPlayer, address);
    const rgbCurrent = yield call(RgbWalletMethods.getCurrentRgb, address);
    const rgbDefault = yield call(RgbWalletMethods.getDefaultRgb, address);
    const data = { address, pseudo: generator(address), rgbCurrent, rgbDefault };
    const user = { isPlaying, isLoading: false, data };
    yield put({ type: SET_USER, user });
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
    yield call(RgbWalletMethods.play, address);
    yield put({ type: START_PLAYING });
  } catch(err) {
    yield put({ type: ADD_ERROR, error: 'Unable to join the game.' });
  } finally {
    yield put({ type: END_TRANSACTION });
  }
}

function* blendWithSelf() {
  try {
    yield put({ type: START_TRANSACTION });
    const address = yield select(state => state.user.data.address);
    yield call(RgbWalletMethods.blendWithYourself, address);
  } catch(err) {
    console.log(err)
    yield put({ type: ADD_ERROR, error: 'Transaction have failed.' });
  } finally {
    yield put({ type: END_TRANSACTION });
  }
}

function* blendWithOthers(otherAddress, otherR, otherG, otherB) {
  try {
    yield put({ type: START_TRANSACTION });
    const address = yield select(state => state.user.data.address);
    yield call(RgbWalletMethods.blendWithOthers, address, otherAddress, otherR, otherG, otherB);
  } catch(err) {
    console.log(err)
    yield put({ type: ADD_ERROR, error: 'Transaction have failed.' });
  } finally {
    yield put({ type: END_TRANSACTION });
  }
}
