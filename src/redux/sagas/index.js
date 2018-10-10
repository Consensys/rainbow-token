import { all } from 'redux-saga/effects';

import userSaga from './user';
import playersSaga from './players';
import gameSaga from './game';

function *mySaga () {
    yield all([
        userSaga(),
        playersSaga(),
        gameSaga()
    ]);
}

export default mySaga;
