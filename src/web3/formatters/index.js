import transactionToEmitter from "./transactionToEmitter";
import eventParser from "./eventParser";
import callParser from "./callParser";

export { eventParser };

export default (abi, eth, methods, contractWs) => {
    const contract = {
        call: {},
        transactions: {},
        events: {}
    };
    const functionsObjects = abi.filter(
        functionObject => functionObject.type === "function"
    );

    // View functions
    const contractCalls = callParser(abi, methods);
    contract.call = { ...contractCalls };

    // Transactions
    const transactionFunctions = functionsObjects.filter(
        functionObject => functionObject.stateMutability !== "view"
    );

    for (let functionObject of transactionFunctions) {
        contract.transactions[functionObject.name] = function() {
            const methodArgs = [...arguments].filter(
                (el, index) => index < functionObject.inputs.length
            );
            const txObject = methods[functionObject.name].apply(
                null,
                methodArgs
            );
            const txArg = arguments[functionObject.inputs.length] || {};
            const signer = arguments[functionObject.inputs.length + 1];

            if (signer) {
                return new Promise((resolve, reject) => {
                    const txData = txObject.encodeABI();
                    const tx = fillTxObject({
                        ...arguments[functionObject.inputs.length],
                        to: contractWs._address,
                        data: txData
                    });
                    const signerAddress = eth.accounts.privateKeyToAccount(
                        signer
                    ).address;
                    eth.getTransactionCount(signerAddress)
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

    // Events
    const contractEvents = eventParser(abi, contractWs);
    contract.events = { ...contractEvents };

    return contract;
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
