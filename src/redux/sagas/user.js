import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import {
    startLoadingUser,
    endLoadingUser,
    setUserAsPlayer
} from '../actions/user';

import {
    addError,
} from '../actions/errors';

import {
  getPlayers
} from '../actions/players';
import {
    START_PLAYING,
    REQUEST_BLEND,
    SET_BLENDING_PRICE,
} from '../actionTypes';

import transactionHandler from './transactionHandler';

/** ******* WORKERS *********/

function *startPlayingSaga () {
  const { address } = yield select(state => state.web3.accounts);
  const { play } = yield select(state => state.web3.contracts.RainbowToken.transactions);
  const chan = yield call(play, address);
  yield call(transactionHandler, chan);
}

function *blendSaga (blendingAddress, blendingToken) {
  const { address } = yield select(state => state.web3.accounts);
  const { blend } = yield select(state => state.web3.contracts.RainbowToken.transactions);
  const chan = yield call(blend, address, blendingAddress, blendingToken);
  yield transactionHandler(chan);
}

function *defaultBlendSaga () {
  const { address } = yield select(state => state.web3.accounts);
  const { defaultBlend } = yield select(state => state.web3.contracts.RainbowToken.transactions);
  const chan = yield call(defaultBlend, address);
  yield transactionHandler(chan);
}

function *setBlendingPriceSaga (price) {
  const { address } = yield select(state => state.web3.accounts);
  const { setBlendingPrice } = yield select(state => state.web3.contracts.RainbowToken.transactions );
  const chan = yield call(setBlendingPrice, address, price);
  yield transactionHandler(chan);
}

export function *getUserStatus() {
  try {
    yield put(startLoadingUser());
    const address = yield select(state => state.web3.accounts.address);
    const { isPlayer } = yield select(state => state.web3.contracts.RainbowToken.call);
    const userIsPlayer = yield call(isPlayer, address);
    if (userIsPlayer) {
      yield put(setUserAsPlayer());
      yield put(getPlayers());
    }
  } catch(err) {
    console.log(err);
    yield put(addError('Unable to fetch the status of the player...'));
  } finally {
    yield put(endLoadingUser());
  }
}

/** ******* WATCHERS *********/

function *watchStartPlaying () {
    yield takeLatest(START_PLAYING, startPlayingSaga);
}

function *watchRequestBlend () {
    yield takeLatest(
      REQUEST_BLEND,
      ({ payload: { blendingAddress, blendingToken } }) => {
        if (blendingAddress && blendingToken) {
          blendSaga(blendingAddress, blendingToken);
        } else {
          defaultBlendSaga();
        }
      }
    );
}

function *watchSetBlendingPrice () {
    yield takeLatest(
        SET_BLENDING_PRICE,
        ({ payload }) => setBlendingPriceSaga(payload));
}

/** ******* SAGA *********/

function *userSaga () {
    yield all([
        watchStartPlaying(),
        watchRequestBlend(),
        watchSetBlendingPrice()
    ]);
}

export default userSaga;
