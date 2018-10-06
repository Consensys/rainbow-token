import { combineReducers } from 'redux';
import user from './user';
import players from './players';
import errors from './errors';
import web3 from './web3';

const rootReducer = combineReducers({
    user,
    players,
    errors,
    web3
});

export default rootReducer;
