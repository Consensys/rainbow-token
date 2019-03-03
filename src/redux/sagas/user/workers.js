// Libs
import { call, put } from 'redux-saga/effects';
import { sendTransaction } from '../web3/transactions';

/* Constants */
import { defaultBlendingPrice } from "../../../constants";

/* Actions */
import {
  addError
} from '../../actions/errors';

export function* playSaga() {
  try {
    yield call(
      sendTransaction,
      {
        contract: 'RainbowToken',
        method: 'play',
        params: [],
        value: defaultBlendingPrice
      }
    )
  } catch(err) {
    console.error(err);
    yield put(addError('Transaction has failed... Unable to join the game.'))
  }
}

export function* setBlendingPriceSaga({ payload: newBlendingPrice }) {
  try {
    yield call(
      sendTransaction,
      {
        contract: 'RainbowToken',
        method: 'setBlendingPrice',
        params: [newBlendingPrice],
      }
    )
  } catch(err) {
    console.error(err);
    yield put(addError('Transaction has failed... Unable to update blending price.'))
  }
}

export function* blendSaga({ payload: { blendingAddress, blendingToken }}) {
  try {
    if (blendingAddress && blendingToken) {
        yield call(
            sendTransaction,
            {
              contract: 'RainbowToken',
              method: 'blend',
              params: [
                blendingAddress,
                blendingToken.blendingPrice,
                blendingToken.color.r,
                blendingToken.color.g,
                blendingToken.color.b
              ],
              value: blendingToken.blendingPrice
            }
        );
    } else {
        yield call(
          sendTransaction,
          {
            contract: 'RainbowToken',
            method: 'defaultBlend',
            params: [],
            value: defaultBlendingPrice
          }
        );
    }
  } catch(err) {
    console.error(err);
    yield put(addError('Transaction has failed... Unable to blend.'))
  }
}

export function* claimVictorySaga() {
  try {
    yield call(
      sendTransaction,
      {
        contract: 'RainbowToken',
        method: 'claimVictory',
        params: [],
      }
    )
  } catch(err) {
    console.error(err);
    yield put(addError('Transaction has failed... Unable to claim victory.'))
  }
}
