import { combineReducers } from "redux";

import transactions from './transactions';
import contracts from './contracts';
import network from './network';
import account from './account';

export default combineReducers({
  transactions,
  contracts,
  network,
  account
});
