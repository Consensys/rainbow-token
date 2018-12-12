import { all } from "redux-saga/effects";

import userSaga from "./user";
import playersSaga from "./players";
import setUpSaga from "./setUp";
import subscriptionSaga from "./subscriptions";

function* mySaga() {
    yield all([userSaga(), playersSaga(), setUpSaga(), subscriptionSaga()]);
}

export default mySaga;
