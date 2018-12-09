import { combineReducers } from "redux";

import user from "./user";
import web3 from "./web3";
import game from "./game";
import players from "./players";

export default combineReducers({
    user,
    web3,
    game,
    players
});
