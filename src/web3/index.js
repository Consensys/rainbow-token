import Web3 from 'web3';
import { eventChannel } from 'redux-saga';
import { computeToken, color } from './utils';
import { abi } from './abis/RainbowToken.json';

// const contractAddress = '0x85a84691547b7ccf19d7c31977a7f8c0af1fb25a';
// const contractAddress = '0x902c1d0c87ad347aa8edae05f7e2bead577432ac'; //old address
// const contractAddress = '0x3568e7583efde314b955f22ba0d1b14db8270bc7'; //new address
// const contractAddress = '0x804417a5177173cc9edfb20d0e4235b653a9bb35'; // very new address

// ganache
const contractAddress = '0x85a84691547b7ccf19d7c31977a7f8c0af1fb25a';

export const web3 = new Web3(Web3.givenProvider);

export const web3Ws = process.env.NODE_ENV === 'development'
    ? new Web3('ws://localhost:7545')
    : new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));

const RainbowToken = new web3.eth.Contract(abi, contractAddress);
export const RainbowTokenWs = new web3Ws.eth.Contract(abi, contractAddress).events;
const targetColor = color([44, 86, 221]);
const defaultBlendingPrice = 10000000000000000;

export default {
    targetColor,
    defaultBlendingPrice,
    getToken: playerAddress => RainbowToken.methods.getToken(playerAddress).call().then(computeToken),
    isPlayer: address => RainbowToken.methods.isPlayer(address).call(),
    getPlayers: () => RainbowToken.methods.getPlayers().call(),
    play: address => {
      return eventChannel(emitter => {
        RainbowToken.methods.play().send({
            from: address,
            value: defaultBlendingPrice,
            gasLimit: 500000,
        })
            .on('transactionHash', txHash => {
                console.log('Transaction hash: ', txHash);
                emitter({ txHash, receipt: undefined, error: undefined })
            })
            .on('receipt', receipt => {
                console.log('Receipt: ', receipt);
                emitter({ txHash: undefined, receipt, error: undefined })
            })
            .on('error', error => {
                console.log(error);
                emitter({ txHash: undefined, receipt: undefined, error })
            });
            return () => false;
      })
    },
    setBlendingPrice: (address, price) => {
      return eventChannel(emitter => {
        RainbowToken.methods.setBlendingPrice(price).send({
            from: address,
        })
            .on('transactionHash', txHash => {
                console.log('Transaction hash: ', txHash);
                emitter({ txHash, receipt: undefined, error: undefined })
            })
            .on('receipt', receipt => {
                console.log('Receipt: ', receipt);
                emitter({ txHash: undefined, receipt, error: undefined })
            })
            .on('error', error => {
                console.log(error);
                emitter({ txHash: undefined, receipt: undefined, error })
            });
            return () => false;
      })
    },
    blend: (address, blendingAddress, blendingToken) => {
        let eventEmitter;
        if (blendingAddress) {
            eventEmitter = RainbowToken.methods.blend(blendingAddress, blendingToken.blendingPrice, blendingToken.color.r, blendingToken.color.g, blendingToken.color.b).send({
                from: address,
                value: blendingToken.blendingPrice,
            });
        } else {
            // this a default blend
            eventEmitter = RainbowToken.methods.defaultBlend().send({
                from: address,
                value: defaultBlendingPrice,
            });
        }
        return eventChannel(emitter => {
          eventEmitter
            .on('transactionHash', txHash => {
                console.log('Transaction hash: ', txHash);
                emitter({ txHash, receipt: undefined, error: undefined })
            })
            .on('receipt', receipt => {
                console.log('Receipt: ', receipt);
                emitter({ txHash: undefined, receipt, error: undefined })
            })
            .on('error', error => {
                console.log(error);
                emitter({ txHash: undefined, receipt: undefined, error })
            });
            return () => false;
        })
    },
    claimVictory: (address) => {
      return eventChannel(emitter => {
        RainbowToken.methods.claimVictory().send({
            from: address,
        })
            .on('transactionHash', txHash => {
                console.log('Transaction hash: ', txHash);
                emitter({ txHash, receipt: undefined, error: undefined })
            })
            .on('receipt', receipt => {
                console.log('Receipt: ', receipt);
                emitter({ txHash: undefined, receipt, error: undefined })
            })
            .on('error', error => {
                console.log(error);
                emitter({ txHash: undefined, receipt: undefined, error })
            });
      })
    },
};
