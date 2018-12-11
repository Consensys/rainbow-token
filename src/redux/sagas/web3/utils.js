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

/** ******* WORKERS *********/

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
    const methods = new eth.Contract(abi, address).methods;
    // Get the events
    const contractWs = new ContractWs(abi, address);
    // Create contract object
    const contract = abiParser(abi, eth, methods, contractWs);
    // Set the contract in the store
    yield put(addContract({ key, contract }));
}

export {
  metamaskHandler,
  networkHandler,
  accountHandler,
  webSocketHandler,
  contractHandler,
  createContract,
}
