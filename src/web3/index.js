import Web3 from 'web3';
import { computeToken, color } from './utils';
import { abi } from './abis/RainbowToken.json';

// const contractAddress = '0x85a84691547b7ccf19d7c31977a7f8c0af1fb25a';
// const contractAddress = '0x902c1d0c87ad347aa8edae05f7e2bead577432ac'; //old address
const contractAddress = '0x3568e7583efde314b955f22ba0d1b14db8270bc7'; //new address

export const web3 = new Web3(Web3.givenProvider);

export const web3Ws = (process.env.NODE_ENV === 'development')
  ? new Web3('ws://localhost:7545')
  : new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'))

const RainbowToken = new web3.eth.Contract(abi, contractAddress);
export const RainbowTokenWs = new web3Ws.eth.Contract(abi, contractAddress).events;
const targetColor = color([44, 86, 221]);
const defaultBlendingPrice = 10000000000000000;

export default {
  targetColor,
  defaultBlendingPrice,
  endTime: () => RainbowToken.methods.endTime().call().then((res) => new Date(res * 1000)),
  getToken: playerAddress => RainbowToken.methods.getToken(playerAddress).call().then((res) => {console.log(res); return computeToken(res)}),
  isPlayer: address => RainbowToken.methods.isPlayer(address).call(),
  getPlayers: () => RainbowToken.methods.getPlayers().call(),
  play: address => {
    return RainbowToken.methods.play().send({
      from: address,
      value: defaultBlendingPrice,
      gasLimit: 500000,
    })
    .on('transactionHash', hash => {
      console.log('Transaction hash: ', hash);
    })
    .on('receipt', receipt => {
      console.log('Receipt: ', receipt);
    })
    .on('error', err => {

    })
  },
  setBlendingPrice: (address, price) => {
    return RainbowToken.methods.setBlendingPrice(price).send({
      from: address
    })
    .on('transactionHash', hash => {
      console.log('Transaction hash: ', hash);
    })
    .on('receipt', receipt => {
      console.log('Receipt: ', receipt);
    })
    .on('error', err => {

    })
  },
  blend: (address, blendingAddress, blendingToken) => {
    let promise;
    if (blendingAddress) {
      promise = RainbowToken.methods.blend(blendingAddress, blendingToken.blendingPrice, blendingToken.color.r, blendingToken.color.g, blendingToken.color.b).send({
        from: address,
        value: blendingToken.blendingPrice,
      })
    } else {
      // this a default blend
      promise = RainbowToken.methods.blend().send({
        from: address,
        value: defaultBlendingPrice,
      })
    }
    return promise
      .on('transactionHash', hash => {
        console.log('Transaction hash: ', hash);
      })
      .on('receipt', receipt => {
        console.log('Receipt: ', receipt);
      })
      .on('error', err => {

      })
  },
  claimVictory: (address) => {
    return RainbowToken.methods.claimVictory().send({
      from: address
    })
    .on('transactionHash', hash => {
      console.log('Transaction hash: ', hash);
    })
    .on('receipt', receipt => {
      console.log('Receipt: ', receipt);
    })
    .on('error', err => {

    })
  },
}