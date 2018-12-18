import { put, call, select } from "redux-saga/effects";

import { abi } from "../../../web3/abis/RainbowToken";

import { createContract } from "../web3/utils";

import {
    newRainbowSet,
    setUserAsPlayer
} from "../../actions/setUp/rainbowToken";

import { callContract } from "../web3/api";

function* setUpRainbow() {
    // Fetch the address of the Rainbow Token
    const rainbowAddress = yield call(callContract, [
        "GameManager",
        "gameAddress"
    ]);
    // Create the contract
    yield call(createContract, "RainbowToken", abi, rainbowAddress);

    // Notice the new game
    yield put(newRainbowSet());
}

function* setUserStatus() {
    const { address } = yield select(state => state.web3.account);
    const userIsPlayer = yield call(callContract, [
        "RainbowToken",
        "isPlayer",
        address
    ]);
    if (userIsPlayer) yield put(setUserAsPlayer());
}

export { setUpRainbow, setUserStatus };
