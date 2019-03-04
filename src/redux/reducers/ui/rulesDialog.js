import { OPEN_RULES_DIALOG, CLOSE_RULES_DIALOG } from "../../actions/ui";
import { INITIALIZE } from '../../actions/setUp';

const DEFAULT_STATE = {
    open: false,
    scroll: "paper"
};

export default (state = DEFAULT_STATE, { type, payload }) => {
    switch (type) {
        case OPEN_RULES_DIALOG:
            return {
                ...state,
                open: true
            };
        case CLOSE_RULES_DIALOG:
            return {
                ...state,
                open: false
            };
        case INITIALIZE:
            return { ...DEFAULT_STATE };
        default:
            return state;
    }
};
