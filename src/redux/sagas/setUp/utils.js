import { put, call, select } from "redux-saga/effects";

import { abi } from "../../../web3/abis/RainbowToken";

import { createContract } from "../web3/utils";

import {
    newRainbowSet,
    setUserAsPlayer
} from "../../actions/setUp/rainbowToken";

function* setUpRainbow() {
    // Fetch the address of the Rainbow Token
    const { gameAddress } = yield select(
        state => state.web3.contracts.GameManager.call
    );
    const rainbowAddress = yield call(gameAddress, {});
    // Create the contract
    yield call(createContract, "RainbowToken", abi, rainbowAddress);

    // Notice the new game
    yield put(newRainbowSet());
}

function* setUserStatus() {
    const { address } = yield select(state => state.web3.account);
    const { isPlayer } = yield select(
        state => state.web3.contracts.RainbowToken.call
    );
    const userIsPlayer = yield call(isPlayer, address, {});
    if (userIsPlayer) yield put(setUserAsPlayer());
}

export { setUpRainbow, setUserStatus };
