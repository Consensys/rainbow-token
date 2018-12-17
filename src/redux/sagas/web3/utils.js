import Web3 from "web3";
import { call, put, select } from "redux-saga/effects";

import {
    setNetwork,
    checkNetwork,
    checkUnlockingMetamask,
    fillAccount,
    addContract
} from "../../actions/web3";

import networkConfig from "../../../web3/config";

import abiParser from "../../../web3/formatters";

/* Helpers */
import transactionHandler from "../utils/transactionHandler";
import transactionToEmitter from "../utils/transactionToEmitter";

function* buildPrimaryTransactionObjectFromContract(
    [contractName, methodName, ...methodArgs],
    txArgs
) {
    const {
        methods,
        options: { address }
    } = yield select(state => state.web3.contracts[contractName]);
    const web3TxObject = methods[methodName].apply(null, methodArgs);
    return {
        data: web3TxObject.encodeABI(),
        to: address,
        ...txArgs
    };
}

function* buildPrimaryTransactionObject(contractMethodOrTx, txArgs) {
    try {
        if (
            contractMethodOrTx instanceof Array &&
            contractMethodOrTx.length >= 2
        ) {
            return yield call(
                buildPrimaryTransactionObjectFromContract,
                contractMethodOrTx,
                txArgs
            );
        } else if (contractMethodOrTx instanceof Object) {
            return contractMethodOrTx;
        } else {
            throw new Error(
                "Invalid parameter, expected transaction object or array."
            );
        }
    } catch (err) {
        console.log(err);
        throw new Error("Unable to build primary transaction object." + err);
    }
}

function* sendFromWallet(primaryTxObject) {
    try {
        const {
            network: { eth },
            account: { address }
        } = yield select(state => state.web3);
        const chan = yield call(
            transactionToEmitter,
            eth.sendTransaction({ ...primaryTxObject, from: address })
        );
        yield call(transactionHandler, chan);
    } catch (err) {
        throw new Error("Unable to send the transaction." + err);
    }
}

function* signTransaction(primaryTxObject, privateKey) {
    try {
        const { eth } = yield select(state => state.web3.network);
        const { address, signTransaction } = yield call(
            [eth.accounts, "privateKeyToAccount"],
            privateKey
        );
        const txObject = { ...primaryTxObject };
        txObject.from = txObject.from ? txObject.from : address;
        txObject.gas = txObject.gas
            ? txObject.gas
            : yield call([eth, "estimateGas"], txObject);
        const { rawTransaction } = yield call(signTransaction, txObject);
        return rawTransaction;
    } catch (err) {
        throw new Error("Unable to sign the transaction.");
    }
}

function* signAndSend(primaryTxObject, privateKey) {
    try {
        const { eth } = yield select(state => state.web3.network);
        const rawTransaction = yield call(signTransaction, primaryTxObject);
        const chan = yield call(
            transactionToEmitter,
            eth.sendSignedTransaction(rawTransaction)
        );
        yield call(transactionHandler, chan);
    } catch (err) {
        throw new Error("Unable to send the transaction." + err);
    }
}

function* metamaskHandler() {
    // Get the provider from Metamask
    const provider = window.ethereum;
    // Ask permission to the user for his address
    const [address] = yield provider.enable();
    const metamaskUnlocked = !!address;
    if (metamaskUnlocked) {
        // Set the address of the user
        yield put(fillAccount({ address: address.toLowerCase() }));
    }
    // Set the status related to Metamask
    yield put(checkUnlockingMetamask(metamaskUnlocked));
    // Return the provider
    return { provider, metamaskUnlocked };
}

function* networkHandler(provider) {
    // Instantiate the web3 instance with the Metamask's provider
    const web3 = new Web3(provider);
    // Get the network id
    const networkId = yield call([web3.eth.net, "getId"]);
    // Check if the network id corresponds to one of the configurations
    const onAvailableNetwork = networkId in networkConfig.networks;
    // Set the network id and the eth object in web3
    yield put(setNetwork({ networkId, eth: web3.eth }));
    // Set the availability of the network in status
    yield put(checkNetwork(onAvailableNetwork));
    // Return the availability
    return onAvailableNetwork;
}

function* accountHandler() {
    // Select the eth object and the address of the user
    const {
        network: { eth },
        account: { address }
    } = yield select(state => state.web3);
    // Get the balance of the user
    const balance = Number(
        Web3.utils.fromWei(yield call([eth, "getBalance"], address), "ether")
    ).toFixed(2);
    // Something else?
    // Fill the account object
    yield put(fillAccount({ balance }));
}

function* webSocketHandler() {
    // Get the network id
    const networkId = yield select(state => state.web3.network.networkId);
    // Get the corresponding provider
    const wsProvider = networkConfig.networks[networkId].wsProvider;
    // Instantiate the web3 instance with eht websocket provider
    const web3Ws = new Web3(new Web3.providers.WebsocketProvider(wsProvider));
    // Set the eth object in web3
    yield put(setNetwork({ ethWs: web3Ws.eth }));
}

function* contractHandler() {
    // Get the network id
    const networkId = yield select(state => state.web3.network.networkId);
    // Loop on the contracts
    for (let key in networkConfig.contracts) {
        // Get the abi and the address of the contract in the contract's object
        const {
            abi,
            networks: {
                [networkId]: { address }
            }
        } = networkConfig.contracts[key];
        // Create the contract in the store
        yield call(createContract, key, abi, address);
    }
}

function* createContract(key, abi, address) {
    // Get the network id in order to find the address
    // and the Contract object of web3 for the methods
    const eth = yield select(state => state.web3.network.eth);
    // Contract object of web3Ws for the events
    const { Contract: ContractWs } = yield select(
        state => state.web3.network.ethWs
    );
    // Get the methods
    const contractHttp = new eth.Contract(abi, address);
    const methods = contractHttp.methods;
    // Get the events
    // const events = new ContractWs(abi, address).events;
    const contractWs = new ContractWs(abi, address);
    // Create contract object
    const contract = abiParser(abi, eth, methods, contractWs);
    // Set the contract in the store
    yield put(
        addContract({
            key,
            contract: {
                ...contract,
                methods: contractHttp.methods,
                events: contractWs.events,
                options: { ...contractHttp.options }
            }
        })
    );
}

export {
    buildPrimaryTransactionObjectFromContract,
    buildPrimaryTransactionObject,
    sendFromWallet,
    signTransaction,
    signAndSend,
    metamaskHandler,
    networkHandler,
    accountHandler,
    webSocketHandler,
    contractHandler,
    createContract
};
