import { put, call, select } from 'redux-saga/effects';

import { abi } from '../../../web3/abis/RainbowToken';

import { createContract } from './web3';

import {
  startLoadingRainbow,
  endLoadingRainbow,
  newRainbowSet
} from '../../actions/gameManager/rainbow';

import {
  addError
} from '../../actions/errors';

export default function*() {
  try {
    yield put(startLoadingRainbow());
    // Fetch the address of the Rainbow Token
    const { gameAddress } = yield select(
      state => state.web3.contracts.GameManager.call
    );
    const rainbowAddress = yield call(gameAddress);

    // Create the contract
    yield call(createContract, 'RainbowToken', abi, rainbowAddress);

    // Notice the new game
    yield put(newRainbowSet());
  } catch(err) {
    console.log(err);
    yield put(addError('Unable to set up the Rainbow Token.'));
  } finally {
    yield put(endLoadingRainbow());
  }
}
