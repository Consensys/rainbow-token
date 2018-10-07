import {
    START_LOADING_WEB3,
    END_LOADING_WEB3,
    CHECK_NETWORK,
    CHECK_UNLOCKING_METAMASK
} from '../../actions/web3';

const DEFAULT_STATE = {
  isLoading: true,
  onAvailableNetwork: false,
  metamaskUnlocked: false
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case START_LOADING_WEB3:
        return { ...state, isLoading: true };
      case END_LOADING_WEB3:
        return { ...state, isLoading: false };
      case CHECK_NETWORK:
        return { ...state, onAvailableNetwork: payload };
      case CHECK_UNLOCKING_METAMASK:
        return { ...state, metamaskUnlocked: payload };
      default:
          return state;
    }
};
