import { call, put, select } from "redux-saga/effects";

/* Actions */
import { addError } from "../../../actions/errors";

/* Helpers */
import transactionHandler from "../../utils/transactionHandler";

/* Constants */
import { defaultBlendingPrice } from "../../../../constants/rainbowToken";

function* startPlayingSaga() {
    try {
        const { address } = yield select(state => state.web3.account);
        const { play } = yield select(
            state => state.web3.contracts.RainbowToken.transactions
        );
        const chan = yield call(play, {
            from: address,
            value: defaultBlendingPrice
        });
        yield call(transactionHandler, chan);
    } catch (err) {
        yield put(addError("An error occured, please refresh the page."));
    }
}

export { startPlayingSaga };
