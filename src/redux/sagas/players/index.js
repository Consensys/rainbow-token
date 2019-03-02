// Libs
import { call, all, takeLatest } from "redux-saga/effects";
import { subscribeToEvent } from '../web3/contracts';

/* Actions */
import { SET_USER_AS_PLAYER } from "../../actions/user";

/* Workers */
import {
    getPlayersSaga,
    reactToPlayerCreatedSaga,
    reactToBlendingPriceSetSaga,
    reactToTokenBlendedSaga,
} from "./workers";

function* watchUserAsPlayer() {
    yield takeLatest(SET_USER_AS_PLAYER, getPlayersSaga);
}

function* subscribeToPlayerCreated() {
  yield call(
    subscribeToEvent,
    {
      contract: 'RainbowToken',
      event: 'PlayerCreated',
      callbacks: reactToPlayerCreatedSaga
    }
  )
}

function* subscribeToBlendingPriceSet() {
  yield call(
    subscribeToEvent,
    {
      contract: 'RainbowToken',
      event: 'BlendingPriceSet',
      callbacks: reactToBlendingPriceSetSaga
    }
  )
}

function* subscribeToTokenBlended() {
  yield call(
    subscribeToEvent,
    {
      contract: 'RainbowToken',
      event: 'TokenBlended',
      callbacks: reactToTokenBlendedSaga
    }
  )
}

export default function*() {
    yield all([
        watchUserAsPlayer(),
        subscribeToPlayerCreated(),
        subscribeToBlendingPriceSet(),
        subscribeToTokenBlended()
    ]);
}
