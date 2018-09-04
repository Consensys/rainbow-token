import generator from 'mnemonic-generator';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import {
  START_LOADING_PLAYERS,
  END_LOADING_PLAYERS,
  GET_PLAYERS,
  SET_PLAYERS,
  UPDATE_TOKEN,
  NEW_PLAYER,
  ADD_PLAYER,
  ADD_ERROR
} from '../actionTypes';

import rainbow from '../../web3';
import { computeScore } from '../../web3/utils';

/********* ACTIONS *********/

export const getPlayers = () => ({
  type: GET_PLAYERS
});

export const updateToken = (address, color) => ({
  type: UPDATE_TOKEN,
  payload: {
    address,
    color,
    score: computeScore(color, rainbow.targetColor),
  }
})

export const newPlayer = address => ({
  type: NEW_PLAYER,
  payload: address
})

/********* WATCHERS *********/

export function* watchGetPlayers() {
  yield takeLatest(GET_PLAYERS, setPlayers);
}

export function* watchNewPlayer() {
  yield takeEvery(NEW_PLAYER, ({ payload }) => addPlayer(payload))
}

/********* WORKERS *********/

function* setPlayers() {
  try {
    yield put({ type: START_LOADING_PLAYERS });
    const players = yield call(rainbow.getPlayers);
    const tokens = yield Promise.all(players.map(address => rainbow.getToken(address)));
    const payload = players.map((address, index) => ({
      address,
      pseudo: generator(address),
      color: tokens[index].color,
      defaultColor: tokens[index].defaultColor,
      score: computeScore(tokens[index].color, rainbow.targetColor),
    }));
    yield put({ type: SET_PLAYERS, payload });
  } catch(err) {
    yield put({ type: ADD_ERROR, error: 'Unable to retrieve the players.' });
  } finally {
    yield put({ type: END_LOADING_PLAYERS });
  }
}

function* addPlayer(address) {
  try {
    const token = yield call(rainbow.getToken, address);
    const payload = {
      address,
      pseudo: generator(address),
      color: token.color,
      defaultColor: token.defaultColor,
      score: computeScore(token.color, rainbow.targetColor),
    };
    yield put({ type: ADD_PLAYER, payload });
  } catch(err) {
    yield put({ type: ADD_ERROR, error: 'Unable to add a player.' });
  } finally {

  }
}
