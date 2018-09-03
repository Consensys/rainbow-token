import {
  START_LOADING_PLAYERS,
  END_LOADING_PLAYERS,
  FETCH_PLAYERS,
  SET_PLAYERS,
  UPDATE_PLAYER,
  REQUEST_NEW_PLAYER,
  ADD_NEW_PLAYER,
  ADD_ERROR
} from '../actionTypes';

import generator from 'mnemonic-generator';

import { RgbWalletMethods } from '../../util/connectors';

import { computeScore } from '../../util/computeScore';

import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'

/********* ACTIONS *********/

export const fetchPlayers = () => ({
  type: FETCH_PLAYERS
});

export const updatePlayerRgb = (blender, updatedRGB) => ({
  type: UPDATE_PLAYER,
  blender,
  updatedRGB
})

export const addNewPlayer = playerAddress => ({
  type: REQUEST_NEW_PLAYER,
  playerAddress
})

/********* WATCHERS *********/

export function* watchFetchingPlayers() {
  yield takeLatest(FETCH_PLAYERS, setPlayers);
}

export function* watchNewPlayer() {
  yield takeEvery(REQUEST_NEW_PLAYER, ({ playerAddress }) => addPlayer(playerAddress))
}

/********* WORKERS *********/

function* setPlayers() {
  try {
    yield put({ type: START_LOADING_PLAYERS });
    const players = yield call(RgbWalletMethods.getPlayers);
    const promisesArray = players.map(playerAddress => RgbWalletMethods.getCurrentRgb(playerAddress));
    const rgbArray = yield Promise.all(promisesArray);
    const data = players.map((playerAddress, index) => ({
      address: playerAddress,
      pseudo: generator(playerAddress),
      rgbCurrent:  rgbArray[index],
      score: computeScore(rgbArray[index])
    }));
    yield put({ type: SET_PLAYERS, data });
  } catch(err) {
    yield put({ type: ADD_ERROR, error: 'Unable to retrieve the players.' });
  } finally {
    yield put({ type: END_LOADING_PLAYERS });
  }
}

function* addPlayer(playerAddress) {
  try {
    const rgb = yield call(RgbWalletMethods.getDefaultRgb,playerAddress)
    const newPlayer = {
      address: playerAddress,
      pseudo: generator(playerAddress),
      rgbCurrent: rgb
    };
    yield put({ type: ADD_NEW_PLAYER, newPlayer });
  } catch(err) {
    yield put({ type: ADD_ERROR, error: 'Unable to add a player.' });
  } finally {

  }
}
