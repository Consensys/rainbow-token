import {
  SUBSCRIBE,
  UNSUBSCRIBE
} from '../../actions/web3/subscriptions';

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case SUBSCRIBE:
      return {
        ...state,
        [payload.id]: payload.callback
      }
    case UNSUBSCRIBE:
      const updatedState = {
        ...state
      }
      delete updatedState[payload];
      return updatedState;
    default:
      return state;
  }
}
