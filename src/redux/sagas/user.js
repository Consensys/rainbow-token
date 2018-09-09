import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import generator from 'mnemonic-generator';

import {
    startLoadingUser,
    endLoadingUser,
    setUser,
    startTransaction,
    endTransaction,
} from '../actions/user';
import {
    addError,
    removeError,
} from '../actions/errors';
import {
    GET_USER,
    START_PLAYING,
    REQUEST_BLEND,
    SET_BLENDING_PRICE,
} from '../actionTypes';
import rainbow, { web3 } from '../../web3';

/** ******* WORKERS *********/

function *getUserSaga () {
    try {
        yield put(startLoadingUser());
        const [address, ...others] = yield call(web3.eth.getAccounts);
        const user = {
            address,
            pseudo: generator(address),
        };
        yield put(setUser(user));
        yield put(removeError());
    } catch (err) {
        yield put(addError('Unable to access an account.'));
    } finally {
        yield put(endLoadingUser());
    }
}

function *startPlayingSaga () {
    try {
        console.log('Piuo');
        yield put(startTransaction());
        console.log('Start playing');
        const address = yield select(state => state.user.data.address);
        console.log('Start playin', address);
        yield call(rainbow.play, address);
    } catch (err) {
        yield put(addError('Unable to join the game.'));
    } finally {
        yield put(endTransaction());
    }
}

function *blendSaga (blendingAddress, blendingToken) {
    try {
        yield put(startTransaction());
        const address = yield select(state => state.user.data.address);
        yield call(rainbow.blend, address, blendingAddress, blendingToken);
    } catch (err) {
        console.log(err);
        yield put(addError('Transaction has failed.'));
    } finally {
        yield put(endTransaction());
    }
}

function *setBlendingPriceSaga (price) {
    try {
        yield put(startTransaction());

        const address = yield select(state => state.user.data.address);
        yield call(rainbow.setBlendingPrice, address, price);
    } catch (err) {
        console.log(err);
        yield put(addError('Transaction has failed.'));
    } finally {
        yield put(endTransaction());
    }
}

/** ******* WATCHERS *********/

function *watchGetUser () {
    yield takeLatest(GET_USER, getUserSaga);
}

function *watchStartPlaying () {
    yield takeLatest(START_PLAYING, startPlayingSaga);
}

function *watchRequestBlend () {
    yield takeLatest(
        REQUEST_BLEND,
        ({ payload: { blendingAddress, blendingToken } }) => blendSaga(blendingAddress, blendingToken));
}

function *watchSetBlendingPrice () {
    yield takeLatest(
        SET_BLENDING_PRICE,
        ({ payload }) => setBlendingPriceSaga(payload));
}

/** ******* SAGA *********/

function *userSaga () {
    yield all([
        watchGetUser(),
        watchStartPlaying(),
        watchRequestBlend(),
        watchSetBlendingPrice(),
    ]);
}

export default userSaga;
