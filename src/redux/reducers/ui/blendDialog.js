import { OPEN_BLEND_DIALOG, CLOSE_BLEND_DIALOG } from "../../actions/ui";
import { INITIALIZE } from '../../actions/setUp';

const DEFAULT_STATE = {
    index: -1
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case OPEN_BLEND_DIALOG:
            return {
                ...state,
                index: payload
            };
        case CLOSE_BLEND_DIALOG:
            return {
                ...state,
                index: -1
            };
        case INITIALIZE:
            return { ...DEFAULT_STATE };
        default:
            return state;
    }
};
