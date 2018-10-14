import {
    call,
    put,
    all,
    take,
    select,
    takeLatest
} from 'redux-saga/effects';
import generator from 'mnemonic-generator';

import {
    startLoadingPlayers,
    endLoadingPlayers,
    setPlayers,
    addPlayer,
    updatePlayerToken,
} from '../actions/players';

import {
    addError,
} from '../actions/errors';

import {
  setUserAsPlayer,
  SET_USER_AS_PLAYER
} from '../actions/user';

import { EVENTS_SET } from '../actions/web3';

import { computeScore, color } from '../../utils';

/** ******* WORKERS *********/

export function *getPlayers () {
    try {
        yield put(startLoadingPlayers());
        const { getPlayers, getToken } = yield select(state => state.web3.contracts.RainbowToken.call);
        const { targetColor } = yield select(state => state.web3.contracts.RainbowToken.constants);
        const { players } = yield select(state => state.data)
        const playerAddresses = yield call(getPlayers);
        const tokens = yield Promise.all(
          playerAddresses
          .filter(address => !(address in players))
          .map(address => getToken(address))
        );
        console.log('TOKENS', tokens)
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
      const userAddress = yield select(state => state.web3.accounts.address);
      const { targetColor } = yield select(state => state.web3.contracts.RainbowToken.constants);
      const player = {
          address,
          pseudo: generator(address),
          token: token,
          score: computeScore(token.color, targetColor),
      };
      yield put(addPlayer(player));
      if (userAddress === address) yield put(setUserAsPlayer());
    } catch (err) {
      yield put(addError('Unable to add a player.'));
    }
}

/** ******* EVENT LISTENERS *********/

function *listenBlendingPrice() {
  yield take(EVENTS_SET)
  const { blendingPriceSet } = yield select(state => state.web3.contracts.RainbowToken.events);
  const chan = yield call(blendingPriceSet);
  while (true) {
    let { player, price } = yield take(chan);
    console.log('BlendingPrice event!');
    yield put(updatePlayerToken(player, undefined, price));
  }
}

function *listenTokenBlended() {
  yield take(EVENTS_SET)
  const { tokenBlended } = yield select(state => state.web3.contracts.RainbowToken.events);
  const chan = yield call(tokenBlended);
  while (true) {
    let { player, r, g, b } = yield take(chan);
    console.log('Token Blended event!');
    yield put(updatePlayerToken(player, color([r, g, b])));
  }
}

function *listenPlayerCreated() {
  yield take(EVENTS_SET)
  const { playerCreated } = yield select(state => state.web3.contracts.RainbowToken.events);
  const chan = yield call(playerCreated);
  while (true) {
      let { player, r, g, b, blendingPrice }  = yield take(chan);
      const token = {
        blendingPrice,
        color: { r, g, b},
        defaultColor: { r, g, b }
      };
      console.log('New Player event!');
      yield call(newPlayerSaga, { address: player, token });
  }
}

/** ******* WATCHERS *********/

function *watchUserAsPlayer() {
  yield takeLatest(SET_USER_AS_PLAYER, getPlayers);
}

function *playersSaga () {
    yield all([
        watchUserAsPlayer(),
        listenBlendingPrice(),
        listenTokenBlended(),
        listenPlayerCreated()
    ]);
}

export default playersSaga;
