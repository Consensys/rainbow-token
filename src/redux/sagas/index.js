import { all } from "redux-saga/effects";

import transactionSaga from "./transactions";
import playersSaga from "./players";
import gameSaga from "./setUp/game";
import subscriptionSaga from "./subscriptions";

function* mySaga() {
    yield all([
        transactionSaga(),
        playersSaga(),
        gameSaga(),
        subscriptionSaga()
    ]);
}

export default mySaga;
