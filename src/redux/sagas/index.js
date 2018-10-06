import { all } from 'redux-saga/effects';

import userSaga from './user';
import playersSaga from './players';
import web3Saga from './web3';

function *mySaga () {
    yield all([
        userSaga(),
        playersSaga(),
        web3Saga()
    ]);
}

export default mySaga;
