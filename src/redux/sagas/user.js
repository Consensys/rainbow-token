import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import generator from 'mnemonic-generator';

import {
    startLoadingUser,
    endLoadingUser,
    setUser,
    GET_USER_STATUS,
    setUserStatus
} from '../actions/user';
import {
    addError,
    removeError,
} from '../actions/errors';
import {
    GET_USER,
    START_PLAYING,
    REQUEST_BLEND,
    SET_BLENDING_PRICE,
} from '../actionTypes';

import transactionHandler from './transactionHandler';

/** ******* WORKERS *********/

function *getUserSaga () {
    try {
        yield put(startLoadingUser());
        const { address } = yield select(state => state.web3.accounts);
        const user = {
            address,
            pseudo: generator(address),
        };
        yield put(setUser(user));
        yield put(removeError());
    } catch (err) {
        yield put(addError('Unable to access an account.'));
    } finally {
        yield put(endLoadingUser());
    }
}

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

function *getUserStatusSaga() {
  try {
    yield put(startLoadingUser());
    const address = yield select(state => state.web3.accounts.address);
    const { isPlayer } = yield select(state => state.web3.contracts.RainbowToken.call);
    const userStatus = yield call(isPlayer, address);
    yield put(setUserStatus(userStatus));
  } catch(err) {
    yield put(addError('Unable to fetch the status of the player.'));
  } finally {
    yield put(endLoadingUser());
  }
}

/** ******* WATCHERS *********/

function *watchGetUser () {
    yield takeLatest(GET_USER, getUserSaga);
}

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

function *watchGetUserStatus() {
  yield takeLatest(GET_USER_STATUS, getUserStatusSaga);
}

/** ******* SAGA *********/

function *userSaga () {
    yield all([
        watchGetUser(),
        watchStartPlaying(),
        watchRequestBlend(),
        watchSetBlendingPrice(),
        watchGetUserStatus()
    ]);
}

export default userSaga;
