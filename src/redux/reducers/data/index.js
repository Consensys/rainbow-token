import { combineReducers } from "redux";

import players from "./players";
import user from "./user";

export default combineReducers({
    players,
    user
});
