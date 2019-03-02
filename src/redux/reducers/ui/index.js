import { combineReducers } from "redux";

import blendDialog from './blendDialog';
import defaultBlendDialog from './defaultBlendDialog';
import priceDialog from './priceDialog';
import rulesDialog from './rulesDialog';

export default combineReducers({
    blendDialog,
    defaultBlendDialog,
    priceDialog,
    rulesDialog,
    // other ui reducers go here
});
