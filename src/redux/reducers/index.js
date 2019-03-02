import { combineReducers } from "redux";

import ui from "./ui";
import status from "./status";
import data from "./data";
import web3 from './web3';

export default combineReducers({
    ui,
    status,
    data,
    web3,
});
