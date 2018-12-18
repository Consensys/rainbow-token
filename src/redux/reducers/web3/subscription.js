import {
    ADD_REACTION_TO_NEW_BLOCK,
    REMOVE_REACTION_TO_NEW_BLOCK
} from "../../actions/web3";

const DEFAULT_STATE = {};

export default (state = DEFAULT_STATE, { type, payload }) => {
    let updatedState;
    switch (type) {
        case ADD_REACTION_TO_NEW_BLOCK:
            return { ...state, [payload.key]: payload.callback };
        case REMOVE_REACTION_TO_NEW_BLOCK:
            updatedState = { ...state };
            delete updatedState[payload];
            return updatedState;
        default:
            return state;
    }
};
