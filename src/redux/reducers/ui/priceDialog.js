import {
    OPEN_PRICE_DIALOG,
    CLOSE_PRICE_DIALOG,
    MODIFY_BLENDING_PRICE_INPUT
} from '../../actions/ui';

const DEFAULT_STATE = {
  open: false,
  blendingPriceInput: '0.01'
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case OPEN_PRICE_DIALOG:
          return {
            ...state,
            open: true
          };
      case CLOSE_PRICE_DIALOG:
          return {
            ...state,
            open: false
          };
      case MODIFY_BLENDING_PRICE_INPUT:
        return {
          ...state,
          blendingPriceInput: payload
        }
      default:
          return state;
    }
};
