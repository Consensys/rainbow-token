import {
    OPEN_DEFAULT_BLEND_DIALOG,
    CLOSE_DEFAULT_BLEND_DIALOG
} from "../../actions/ui";
import {
  INITIALIZE
} from '../../actions/setUp';

const DEFAULT_STATE = {
    open: false
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case OPEN_DEFAULT_BLEND_DIALOG:
            return {
                ...state,
                open: true
            };
        case CLOSE_DEFAULT_BLEND_DIALOG:
            return {
                ...state,
                open: false
            };
        case INITIALIZE:
            return DEFAULT_STATE;
        default:
            return state;
    }
};
