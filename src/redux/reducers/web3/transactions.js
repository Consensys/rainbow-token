// Actions
import {
  START_TRANSACTION,
  END_TRANSACTION,
  REMOVE_TRANSACTION,
} from "../../actions/web3/transactions";

const DEFAULT_STATE = {
  list: {},
  txInProgress: false
}

export default (state = DEFAULT_STATE, { type, payload }) => {
    let listCopy;
    switch (type) {
        case START_TRANSACTION:
            return {
              ...state,
              list: {
                ...state.list,
                [payload]: {}
              },
              txInProgress: true,
            }
        case END_TRANSACTION:
            listCopy = {
              ...state.list,
              [payload.transactionHash]: {
                status: payload.status,
                blockNumber: payload.blockNumber
              }
            }
            return {
              ...state,
              list: listCopy,
              txInProgress: Object.values(listCopy).some(tx => !('blockNumber' in tx)),
            }
        case REMOVE_TRANSACTION:
            listCopy = { ...state.list };
            delete listCopy[payload];
            return {
              ...state,
              list: listCopy,
              txInProgress: Object.values(listCopy).some(tx => !('blockNumber' in tx)),
            };
        default:
            return state;
    }
};
