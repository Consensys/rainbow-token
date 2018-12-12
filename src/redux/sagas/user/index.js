import { all } from "redux-saga/effects";

import blend from "./blend";
import setBlendingPrice from "./setBlendingPrice";
import startPlaying from "./startPlaying";

export default function*() {
    yield all([blend(), setBlendingPrice(), startPlaying()]);
}
