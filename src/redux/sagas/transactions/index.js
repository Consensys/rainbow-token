import { all } from "redux-saga/effects";

import rainbowTokenSaga from "./rainbowToken";

export default function*() {
    yield all([rainbowTokenSaga()]);
}
