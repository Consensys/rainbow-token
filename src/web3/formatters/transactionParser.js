import transactionToEmitter from "./transactionToEmitter";

export default (abi, methods, eth) => {
    const returnedTransactions = {};

    const transactionFunctions = abi
        .filter(functionObject => functionObject.type === "function")
        .filter(functionObject => functionObject.stateMutability !== "view");

    for (let functionObject of transactionFunctions) {
        returnedTransactions[functionObject.name] = function() {
            const methodArgs = [...arguments].filter(
                (el, index) => index < functionObject.inputs.length
            );
            const txObject = methods[functionObject.name].apply(
                null,
                methodArgs
            );
            const txArg = arguments[functionObject.inputs.length];
            const signer = arguments[functionObject.inputs.length + 1];

            if (signer) {
                return new Promise((resolve, reject) => {
                    const txData = txObject.encodeABI();
                    const tx = fillTxObject({
                        ...arguments[functionObject.inputs.length],
                        data: txData
                    });
                    const signerAddress = eth.accounts.privateKeyToAccount(
                        signer
                    ).address;
                    eth.getTransactionCount(signerAddress, "pending")
                        .then(nonce =>
                            eth.accounts.signTransaction(
                                {
                                    ...tx,
                                    nonce
                                },
                                signer
                            )
                        )
                        .then(({ rawTransaction }) =>
                            resolve(
                                transactionToEmitter(
                                    eth.sendSignedTransaction(rawTransaction)
                                )
                            )
                        )
                        .catch(reject);
                });
            } else {
                return transactionToEmitter(txObject.send(txArg));
            }
        };
    }

    return returnedTransactions;
};

const fillTxObject = txObject => {
    const gas = txObject.gas ? txObject.gas : 400000;
    const gasPrice = txObject.gasPrice ? txObject.gasPrice : 10000000000;
    return {
        ...txObject,
        gas,
        gasPrice
    };
};
