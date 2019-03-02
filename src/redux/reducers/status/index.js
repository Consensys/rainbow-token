import { combineReducers } from "redux";

import players from './players';
import setUp from './setUp';
import user from './user';


export default combineReducers({
    // status reducers go here
    players,
    setUp,
    user,
});
