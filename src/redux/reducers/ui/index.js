import { combineReducers } from "redux";

import rulesDialog from './rulesDialog'
import defaultBlendDialog from './defaultBlendDialog'
import priceDialog from './priceDialog'

export default combineReducers({
  rulesDialog,
  defaultBlendDialog,
  priceDialog
});
