import { combineReducers } from 'redux';
import data from './data';
import errors from './errors';
import status from './status';
import web3 from './web3';

const rootReducer = combineReducers({
    data,
    errors,
    status,
    web3
});

export default rootReducer;
