import { all } from 'redux-saga/effects';

import userSaga from './user';
import playersSaga from './players';

function *mySaga () {
    yield all([
        userSaga(),
        playersSaga()
    ]);
}

export default mySaga;
