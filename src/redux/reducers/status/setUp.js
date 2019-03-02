import {
    INITIALIZE,
    END_INITIALIZATION
} from "../../actions/setUp";

const DEFAULT_STATE = {
    isLoading: true
};

export default (state = DEFAULT_STATE, { type }) => {
    switch (type) {
        case END_INITIALIZATION:
            return { ...state, isLoading: false };
        case INITIALIZE:
            return DEFAULT_STATE;
        default:
            return state;
    }
};
