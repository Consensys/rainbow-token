import { call, put } from "redux-saga/effects";

/* Helpers */
import {
    metamaskHandler,
    networkHandler,
    accountHandler,
    webSocketHandler,
    contractHandler
} from "./utils";

/* Actions */
import {
    startLoadingWeb3,
    endLoadingWeb3,
    eventsSet
} from "../../actions/web3";
import { addError } from "../../actions/errors";

function* setUpWeb3() {
    try {
        yield put(startLoadingWeb3());
        // Handle the Metamask unlocking
        const { provider, metamaskUnlocked } = yield call(metamaskHandler);
        // Handle the Network wrt the configurations
        const onAvailableNetwork = yield call(networkHandler, provider);
        // Fill the user informations
        yield call(accountHandler);
        if (onAvailableNetwork) {
            // Handle the web sockets for event listening
            yield call(webSocketHandler);
            // Instantiate every contracts that are in the configs
            yield call(contractHandler);
            // Events can be listened
            yield put(eventsSet());
        }
        return onAvailableNetwork && metamaskUnlocked;
    } catch (err) {
        console.log(err);
        yield put(addError("Unable to set up the web3 instance."));
        return false;
    } finally {
        yield put(endLoadingWeb3());
    }
}

export { setUpWeb3 };
