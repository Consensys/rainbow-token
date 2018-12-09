import { combineReducers } from "redux";

import rulesDialog from "./rulesDialog";
import defaultBlendDialog from "./defaultBlendDialog";
import priceDialog from "./priceDialog";
import blendDialog from "./blendDialog";

export default combineReducers({
    rulesDialog,
    defaultBlendDialog,
    priceDialog,
    blendDialog
});
