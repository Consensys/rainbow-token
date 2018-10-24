import { combineReducers } from "redux";

import transactions from './transactions';
import contracts from './contracts';
import network from './network';

export default combineReducers({
  transactions,
  contracts,
  network
});
