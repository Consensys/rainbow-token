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
} from '../actions/setUp/rainbowToken';

import { NEW_RAINBOW_SET } from '../actions/setUp/rainbowToken';

import { computeScore, color, computeToken } from '../../utils';

import { targetColor } from '../../constants/rainbowToken';

/** ******* WORKERS *********/

export function *getPlayers () {
    try {
        yield put(startLoadingPlayers());
        const { getPlayers, getToken } = yield select(
          state => state.web3.contracts.RainbowToken.call
        );
        const { players } = yield select(state => state.data)
        const playerAddresses = yield call(getPlayers, {});
        const tokens = (yield all(
          playerAddresses
          .filter(address => !(address in players))
          .map(address => call(getToken, address, {}))
        )).map(computeToken);
        console.log(tokens);
        for (let i = 0; i < playerAddresses.length; i++) {
            players[playerAddresses[i].toLowerCase()] = {
                address: playerAddresses[i].toLowerCase(),
                pseudo: generator(playerAddresses[i].toLowerCase()),
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

/** ******* EVENT LISTENERS *********/

function *listenBlendingPrice() {
  const { BlendingPriceSet } = yield select(
    state => state.web3.contracts.RainbowToken.events
  );
  const chan = yield call([BlendingPriceSet, 'listening'], undefined, {});
  while (true) {
    let { player, price } = yield take(chan);
    console.log('BlendingPrice event!');
    yield put(updatePlayerToken(player.toLowerCase(), undefined, price));
  }
}

function *listenTokenBlended() {
  const { TokenBlended } = yield select(
    state => state.web3.contracts.RainbowToken.events
  );
  const chan = yield call([TokenBlended, 'listening'], undefined, {});
  while (true) {
    let { player, r, g, b } = yield take(chan);
    console.log('Token Blended event!');
    yield put(updatePlayerToken(player.toLowerCase(), color([r, g, b])));
  }
}

function *listenPlayerCreated() {
  const { PlayerCreated } = yield select(
    state => state.web3.contracts.RainbowToken.events
  );
  const chan = yield call([PlayerCreated, 'listening'], undefined, {});
  while (true) {
      let { player, r, g, b, blendingPrice }  = yield take(chan);
      const token = {
        blendingPrice,
        color: { r, g, b},
        defaultColor: { r, g, b }
      };
      const newPlayer = {
          address: player.toLowerCase(),
          pseudo: generator(player.toLowerCase()),
          token,
          score: computeScore(token.color, targetColor),
      };
      yield put(addPlayer(newPlayer));
      const { address: userAddress } = yield select(
        state => state.web3.account
      );
      if (userAddress === player.toLowerCase()) yield put(setUserAsPlayer());
  }
}

/** ******* WATCHERS *********/

function *watchUserAsPlayer() {
  yield takeLatest(SET_USER_AS_PLAYER, getPlayers);
}

function *watchListenBlendingPrice() {
  yield takeLatest(NEW_RAINBOW_SET, listenBlendingPrice)
};

function *watchListenTokenBlended() {
  yield takeLatest(NEW_RAINBOW_SET, listenTokenBlended)
};

function *watchListenPlayerCreated() {
  yield takeLatest(NEW_RAINBOW_SET, listenPlayerCreated)
};

function *playersSaga () {
    yield all([
        watchUserAsPlayer(),
        watchListenBlendingPrice(),
        watchListenTokenBlended(),
        watchListenPlayerCreated()
    ]);
}

export default playersSaga;
