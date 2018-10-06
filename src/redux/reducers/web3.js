import {
    SET_WEB3,
    START_LOADING_WEB3,
    END_LOADING_WEB3
} from '../actionTypes';

const DEFAULT_STATE = {
    isLoading: false,
    onAvailableNetwork: false,
    web3: undefined,
    web3Ws: undefined,
    contracts: undefined
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case START_LOADING_WEB3:
        return { ...state, isLoading: true };
      case END_LOADING_WEB3:
        return { ...state, isLoading: false };
      case SET_WEB3:
        return { ...state, ...payload };
      default:
        return state;
    }
};
