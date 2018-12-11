import { all } from "redux-saga/effects";

import transactionSaga from "./transactions";
import playersSaga from "./players";
import setUpSaga from "./setUp";
import subscriptionSaga from "./subscriptions";

function* mySaga() {
    yield all([
        transactionSaga(),
        playersSaga(),
        setUpSaga(),
        subscriptionSaga()
    ]);
}

export default mySaga;
