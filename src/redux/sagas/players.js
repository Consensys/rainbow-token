import {
    call,
    put,
    takeLatest,
    takeEvery,
    all,
} from 'redux-saga/effects';
import generator from 'mnemonic-generator';

import {
    startLoadingPlayers,
    endLoadingPlayers,
    setPlayers,
    addPlayer,
} from '../actions/players';
import {
    addError,
} from '../actions/errors';
import {
    GET_PLAYERS,
    NEW_PLAYER,
} from '../actionTypes';
import rainbow from '../../web3';
import { computeScore } from '../../web3/utils';

/** ******* WORKERS *********/

function *getPlayersSaga () {
    try {
        yield put(startLoadingPlayers());
        const playerAddresses = yield call(rainbow.getPlayers);
        const tokens = yield Promise.all(playerAddresses.map(address => rainbow.getToken(address)));
        const players = {};
        for (let i = 0; i < playerAddresses.length; i++) {
            players[playerAddresses[i]] = {
                address: playerAddresses[i],
                pseudo: generator(playerAddresses[i]),
                token: tokens[i],
                score: computeScore(tokens[i].color, rainbow.targetColor),
            };
        }
        console.log(players);
        yield put(setPlayers(players));
    } catch (err) {
        console.log(err);
        yield put(addError('Unable to retrieve the players.'));
    } finally {
        yield put(endLoadingPlayers());
    }
}

function *newPlayerSaga (address) {
    try {
        console.log('New Plyer saga', address);
        const token = yield call(rainbow.getToken, address);
        const player = {
            address,
            pseudo: generator(address),
            token: token,
            score: computeScore(token.color, rainbow.targetColor),
        };
        console.log('New Plyer saga', player);
        yield put(addPlayer(player));
    } catch (err) {
        yield put(addError('Unable to add a player.'));
    } finally {

    }
}

/** ******* WATCHERS *********/

function *watchGetPlayers () {
    yield takeLatest(GET_PLAYERS, getPlayersSaga);
}

function *watchNewPlayer () {
    yield takeEvery(NEW_PLAYER, ({ payload }) => newPlayerSaga(payload));
}

function *playersSaga () {
    yield all([
        watchGetPlayers(),
        watchNewPlayer(),
    ]);
}

export default playersSaga;
