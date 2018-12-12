import { call, put, select } from "redux-saga/effects";

/* Actions */
import { addError } from "../../../actions/errors";

/* Helpers */
import transactionHandler from "../../utils/transactionHandler";

/* Constants */
import { defaultBlendingPrice } from "../../../../constants/rainbowToken";

function* blendSaga(blendingAddress, blendingToken) {
    try {
        const { address } = yield select(state => state.web3.account);
        const { blend } = yield select(
            state => state.web3.contracts.RainbowToken.transactions
        );
        const chan = yield call(
            blend,
            blendingAddress,
            blendingToken.blendingPrice,
            blendingToken.color.r,
            blendingToken.color.g,
            blendingToken.color.b,
            {
                from: address,
                value: blendingToken.blendingPrice
            }
        );
        yield transactionHandler(chan);
    } catch (err) {
        yield put(addError("An error occured, please refresh the page."));
    }
}

function* defaultBlendSaga() {
    try {
        const { address } = yield select(state => state.web3.account);
        const { defaultBlend } = yield select(
            state => state.web3.contracts.RainbowToken.transactions
        );
        const chan = yield call(defaultBlend, {
            from: address,
            value: defaultBlendingPrice
        });
        yield transactionHandler(chan);
    } catch (err) {
        yield put(addError("An error occured, please refresh the page."));
    }
}

export { blendSaga, defaultBlendSaga };
