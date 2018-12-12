import { call, put, select } from "redux-saga/effects";

/* Actions */
import { addError } from "../../../actions/errors";

/* Helpers */
import transactionHandler from "../../utils/transactionHandler";

function* setBlendingPriceSaga(price) {
    try {
        const { address } = yield select(state => state.web3.account);
        const { setBlendingPrice } = yield select(
            state => state.web3.contracts.RainbowToken.transactions
        );
        const chan = yield call(setBlendingPrice, price, { from: address });
        yield transactionHandler(chan);
    } catch (err) {
        yield put(addError("An error occured, please refresh the page."));
    }
}

export { setBlendingPriceSaga };
