import {
    OPEN_BLEND_DIALOG,
    CLOSE_BLEND_DIALOG
} from '../../actions/ui';

const DEFAULT_STATE = {
  open: false,
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
      case OPEN_BLEND_DIALOG:
          return {
            ...state,
            open: true
          };
      case CLOSE_BLEND_DIALOG:
          return {
            ...state,
            open: false
          };
      default:
          return state;
    }
};
