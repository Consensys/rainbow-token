// Libs
import { call, put, select } from 'redux-saga/effects';
import { contractCall } from '../web3/contracts';
import { setUpWeb3 } from '../web3/setUp';

/* Actions */
import {
  setUserAsPlayer
} from '../../actions/user';
import {
  endInitialization
} from '../../actions/setUp';
import {
  addError
} from '../../actions/errors';

export function* initializeSaga() {
  try {
    yield call(setUpWeb3);
    const { defaultAccount } = yield select(
      state => state.web3.accounts
    )
    const isPlayer = yield call(
      contractCall,
      {
        contract: 'RainbowToken',
        method: 'isPlayer',
        params: [defaultAccount],
      }
    )
    if (isPlayer) {
      yield put(setUserAsPlayer());
    }
  } catch(err) {
    console.error(err);
    yield put(addError('Transaction has failed... Unable to join the game.'))
  } finally {
    yield put(endInitialization());
  }
}
