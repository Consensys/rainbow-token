import {
    call,
    put,
    takeLatest,
    takeEvery,
    all,
    take,
    select
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

import { computeScore, color } from '../../web3/utils';

import { EVENTS_SET } from '../actions/web3';

/** ******* WORKERS *********/

function *getPlayersSaga () {
    try {
        yield put(startLoadingPlayers());
        const { getPlayers, getToken } = yield select(state => state.web3.contracts.RainbowToken.call);
        const { targetColor } = yield select(state => state.web3.contracts.RainbowToken.constants);
        const playerAddresses = yield call(getPlayers);
        const tokens = yield Promise.all(playerAddresses.map(address => getToken(address)));
        const players = {};
        for (let i = 0; i < playerAddresses.length; i++) {
            players[playerAddresses[i]] = {
                address: playerAddresses[i],
                pseudo: generator(playerAddresses[i]),
                token: tokens[i],
                score: computeScore(tokens[i].color, targetColor),
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

function *newPlayerSaga ({ address, token }) {
    try {
      const { targetColor } = yield select(state => state.web3.contracts.RainbowToken.constants);
      const player = {
          address,
          pseudo: generator(address),
          token: token,
          score: computeScore(token.color, targetColor),
      };
      console.log('IN SAGA newPlayerSaga');
      yield put(addPlayer(player));
    } catch (err) {
      yield put(addError('Unable to add a player.'));
    } finally {

    }
}

/** ******* EVENT LISTENERS *********/

function *listenBlendingPrice() {
  yield take(EVENTS_SET)
  const blendingPriceSet = yield select(state => state.web3.contracts.RainbowToken.events.blendingPriceSet);
  const chan = yield call(blendingPriceSet);
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
  yield take(EVENTS_SET)
  const tokenBlended = yield select(state => state.web3.contracts.RainbowToken.events.tokenBlended);
  const chan = yield call(tokenBlended);
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
  yield take(EVENTS_SET)
  const playerCreated = yield select(state => state.web3.contracts.RainbowToken.events.playerCreated);
  const chan = yield call(playerCreated);
  try {
    while (true) {
        let { player, r, g, b, blendingPrice }  = yield take(chan);
        const token = {
          blendingPrice,
          color: { r, g, b},
          defaultColor: { r, g, b }
        };
        console.log('New Player event!');
        yield put(newPlayer({ address: player, token }));
    }
  } finally {

  }
}

/** ******* WATCHERS *********/

function *watchGetPlayers () {
    yield takeLatest(GET_PLAYERS, getPlayersSaga);
}

function *watchNewPlayer () {
    yield takeEvery(NEW_PLAYER, ({ payload }) => newPlayerSaga({ address: payload.address, token: payload.token }));
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
