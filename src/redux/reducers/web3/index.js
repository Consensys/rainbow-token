import { combineReducers } from "redux";

import eth from "./eth";
import status from './status';
import blocks from './blocks';
import network from './network';
import accounts from './accounts';
import contracts from './contracts';
import transactions from './transactions';
import subscriptions from './subscriptions';

export default combineReducers({
    eth,
    status,
    blocks,
    network,
    accounts,
    contracts,
    transactions,
    subscriptions,
    // other web3 reducers go here
});
