import { combineReducers } from "redux";

import transactions from './transactions';
import contracts from './contracts';
import network from './network';
import accounts from './accounts';

export default combineReducers({
  transactions,
  contracts,
  network,
  accounts
});
