import {
    call,
    put,
    takeLatest,
    takeEvery,
    all,
    take
} from 'redux-saga/effects';
import generator from 'mnemonic-generator';

import {
    startLoadingPlayers,
    endLoadingPlayers,
    setPlayers,
    addPlayer,
    updatePlayerToken,
    newPlayer,
} from '../actions/players';
import {
    addError,
} from '../actions/errors';
import {
    GET_PLAYERS,
    NEW_PLAYER,
} from '../actionTypes';
import rainbow from '../../web3';
import { computeScore, color } from '../../web3/utils';

import {
  blendingPriceSetEmitter,
  tokenBlendedEmitter,
  playerCreatedEmitter
} from './eventEmitters';

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
        const token = yield call(rainbow.getToken, address);
        const player = {
            address,
            pseudo: generator(address),
            token: token,
            score: computeScore(token.color, rainbow.targetColor),
        };
        yield put(addPlayer(player));
    } catch (err) {
        yield put(addError('Unable to add a player.'));
    } finally {

    }
}

/** ******* EVENT LISTENERS *********/

function *listenBlendingPrice() {
  const chan = yield call(blendingPriceSetEmitter);
  try {
    while (true) {
      let { player, price } = yield take(chan);
      console.log('BlendingPrice event!');
      yield put(updatePlayerToken(player, undefined, price));
    }
  } finally {

  }
}

function *listenTokenBlended() {
  const chan = yield call(tokenBlendedEmitter);
  try {
    while (true) {
      let { player, r, g, b } = yield take(chan);
      console.log('Token Blended event!');
      yield put(updatePlayerToken(player, color([r, g, b])));
    }
  } finally {

  }
}

function *listenPlayerCreated() {
  const chan = yield call(playerCreatedEmitter);
  try {
    while (true) {
        let { player }  = yield take(chan);
        console.log('New Player event!');
        yield put(newPlayer(player));
    }
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
        listenBlendingPrice(),
        listenTokenBlended(),
        listenPlayerCreated()
    ]);
}

export default playersSaga;
