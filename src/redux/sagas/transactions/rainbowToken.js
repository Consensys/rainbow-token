import { call, put, select, takeLatest, all } from 'redux-saga/effects';

import {
    START_PLAYING,
    REQUEST_BLEND,
    SET_BLENDING_PRICE,
} from '../../actions/transactions/rainbowToken';

import {
    addError,
} from '../../actions/errors';

import transactionHandler from './transactionHandler';

import { defaultBlendingPrice } from '../../../constants/rainbowToken';

/** ******* WORKERS *********/

function *startPlayingSaga () {
  try {
    const { address } = yield select(state => state.data.user);
    const { play } = yield select(
      state => state.web3.contracts.RainbowToken.transactions
    );
    const chan = yield call(
      play,
      {
        from: address,
        value: defaultBlendingPrice
      }
    );
    yield call(transactionHandler, chan);
  } catch(err) {
    yield put(addError('An error occured, please refresh the page.'));
  }
}

function *blendSaga (blendingAddress, blendingToken) {
  try {
    const { address } = yield select(state => state.data.user);
    const { blend } = yield select(
      state => state.web3.contracts.RainbowToken.transactions
    );
    const chan = yield call(
      blend,
      blendingAddress,
      blendingToken.blendingPrice,
      blendingToken.color.r,
      blendingToken.color.g,
      blendingToken.color.b,
      {
        from: address,
        value: blendingToken.blendingPrice
      });
    yield transactionHandler(chan);
  } catch(err) {
    yield put(addError('An error occured, please refresh the page.'));
  }
}

function *defaultBlendSaga () {
  try {
    const { address } = yield select(state => state.data.user);
    const { defaultBlend } = yield select(
      state => state.web3.contracts.RainbowToken.transactions
    );
    const chan = yield call(
      defaultBlend,
      {
        from: address,
        value: defaultBlendingPrice
      });
    yield transactionHandler(chan);
  } catch(err) {
    yield put(addError('An error occured, please refresh the page.'));
  }
}

function *setBlendingPriceSaga (price) {
  try {
    const { address } = yield select(state => state.data.user);
    const { setBlendingPrice } = yield select(
      state => state.web3.contracts.RainbowToken.transactions
    );
    const chan = yield call(setBlendingPrice, price, { from: address });
    yield transactionHandler(chan);
  } catch(err) {
    yield put(addError('An error occured, please refresh the page.'));
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
          return blendSaga(blendingAddress, blendingToken);
        } else {
          return defaultBlendSaga();
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

export default function* () {
    yield all([
        watchStartPlaying(),
        watchRequestBlend(),
        watchSetBlendingPrice()
    ]);
}
