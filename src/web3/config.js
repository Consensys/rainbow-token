import GameManager from "./abis/GameManager";

export default {
    networks: {
        "3": {
            wsProvider: "wss://ropsten.infura.io/ws"
        },
        "90451": {
            wsProvider: "ws://localhost:7545"
        }
    },
    contracts: {
        GameManager
    }
};
