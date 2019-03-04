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
  const { Contract, ContractMetamask } = yield select(
    state => state.web3.eth
  );
  // Build contract
  // If ContractMetamask exists, use it for the methods
  const { methods: methodsMetamask } = ContractMetamask
  ? new ContractMetamask(abi, address.toLowerCase(), options)
  : { methods: null };
  const rawContract = new Contract(abi, address.toLowerCase(), options);
  const contract = methodsMetamask
  ? {
    ...rawContract,
    methods: methodsMetamask
  } : rawContract;
  // Add contract to store
  yield put(addContract(name, contract));
}

export {
  subscribeToEvent,
  getPastEvents,
  waitForEvent,
  contractCall,
}
