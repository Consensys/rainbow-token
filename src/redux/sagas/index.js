import { all } from 'redux-saga/effects';

import transactionSaga from './transactions';
import playersSaga from './players';
import gameSaga from './setUp/game';

function *mySaga () {
    yield all([
        transactionSaga(),
        playersSaga(),
        gameSaga()
    ]);
}

export default mySaga;
