import { combineReducers } from "redux";

import user from './user';
import web3 from './web3';

export default combineReducers({
  user,
  web3
});
