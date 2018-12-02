import { eventChannel } from "redux-saga";

export default (transaction) => {
    return eventChannel(emitter => {
        transaction
            .on("transactionHash", txHash => {
                emitter({ type: "TRANSACTION_HASH", payload: txHash });
            })
            .on("receipt", receipt => {
                emitter({ type: "RECEIPT", payload: receipt });
            })
            .on("error", error => {
                console.log(error);
                emitter({ type: "ERROR", payload: error });
            });
        return () => false;
    });
};
