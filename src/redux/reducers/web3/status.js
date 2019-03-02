// Actions
import {
  START_LOADING_WEB3,
  END_LOADING_WEB3,
  SUCCESSFUL_SET_UP
} from "../../actions/web3/setUp";

const DEFAULT_STATE = {
  isLoading: false,
  isSetUp: false,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case START_LOADING_WEB3:
            return {
              ...state,
              isLoading: true
            };
        case END_LOADING_WEB3:
            return {
              ...state,
              isLoading: false
            };
        case SUCCESSFUL_SET_UP:
            return {
              ...state,
              isSetUp: true
            }
        default:
            return state;
    }
};
