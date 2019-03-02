// Libs
import { put, select } from 'redux-saga/effects';

import { subscribeToEvent, getPastEvents, waitForEvent } from './events';
import { contractCall } from './methods';

// Actions
import {
  addContract
} from '../../../actions/web3/contracts';

export function* createContract(
  name,
  abi,
  address = undefined,
  options = {}
) {
  // Get the Contract builder object
  const { Contract } = yield select(
    state => state.web3.eth
  );
  // Build contract
  const contract = new Contract(abi, address, options);
  // Add contract to store
  yield put(addContract(name, contract));
}

export {
  subscribeToEvent,
  getPastEvents,
  waitForEvent,
  contractCall,
}
