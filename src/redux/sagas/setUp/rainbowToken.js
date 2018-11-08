import { put, call, select } from 'redux-saga/effects';

import { abi } from '../../../web3/abis/RainbowToken';

import { createContract } from './web3';

import {
  startLoadingRainbow,
  endLoadingRainbow,
  newRainbowSet,
  setUserAsPlayer
} from '../../actions/setUp/rainbowToken';


import {
  addError
} from '../../actions/errors';

export function* setUpRainbow() {
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

export function *setUserStatus() {
  try {
    const { address } = yield select(state => state.data.user);
    const { isPlayer } = yield select(
      state => state.web3.contracts.RainbowToken.call
    );
    const userIsPlayer = yield call(isPlayer, address, {});
    if (userIsPlayer) yield put(setUserAsPlayer());
  } catch(err) {
    console.log(err);
    yield put(addError('Unable to fetch the status of the player...'));
  }
}
