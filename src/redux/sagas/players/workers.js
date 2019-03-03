// Libs
import { call, put, all, select } from "redux-saga/effects";
import generator from "mnemonic-generator";
import { contractCall } from '../web3/contracts'

/* Actions */
import {
    startLoadingPlayers,
    endLoadingPlayers,
    setPlayers,
    addPlayer,
    updatePlayerToken
} from "../../actions/players";
import { addError } from "../../actions/errors";
import { setUserAsPlayer } from "../../actions/user";

/* Helpers */
import { computeScore, color, computeToken } from "../../../utils";

/* Constants */
import { targetColor } from "../../../constants";

export function* getPlayersSaga() {
    try {
        yield put(startLoadingPlayers());
        const { players } = yield select(state => state.data);
        const missingPlayerAddresses = (
          yield call(
            contractCall,
            {
              contract: 'RainbowToken',
              method: 'getPlayers',
              params: []
            }
          )
        ).filter(address => !(address in players))
        const tokens = (
          yield all(
            missingPlayerAddresses
            .map(address =>
              call(
                contractCall,
                {
                  contract: 'RainbowToken',
                  method: 'getToken',
                  params: [address]
                }
              )
            )
          )
        ).map(computeToken);
        missingPlayerAddresses.forEach(
          (address, index) => {
            players[address] = {
              address,
              pseudo: generator(address),
              token: tokens[index],
              score: computeScore(tokens[index].color, targetColor)
            }
          }
        )
        yield put(setPlayers(players));
    } catch (err) {
        console.error(err);
        yield put(addError("Unable to retrieve the players."));
    } finally {
        yield put(endLoadingPlayers());
    }
}

export function* reactToPlayerCreatedSaga({ player, r, g, b, blendingPrice }) {
  try {
    const token = {
        blendingPrice,
        color: { r, g, b },
        defaultColor: { r, g, b }
    };
    const newPlayer = {
        address: player,
        pseudo: generator(player),
        token,
        score: computeScore(token.color, targetColor)
    };
    yield put(addPlayer(newPlayer));
    const { defaultAccount } = yield select(state => state.web3.accounts);
    if (defaultAccount === player) yield put(setUserAsPlayer());
  } catch(err) {
    console.error(err);
    yield put(addError("Unable to add the player."));
  }
}

export function* reactToBlendingPriceSetSaga({ player, price }) {
  try {
    yield put(updatePlayerToken(player, undefined, price));
  } catch(err) {
    console.error(err);
    yield put(addError("Unable to add the player."));
  }
}

export function* reactToTokenBlendedSaga({ player, r, g, b }) {
  try {
    yield put(updatePlayerToken(player, color([r, g, b])));
  } catch(err) {
    console.error(err);
    yield put(addError("Unable to add the player."));
  }
}
