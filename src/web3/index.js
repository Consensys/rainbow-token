import Web3 from 'web3';
import { computeToken } from './utils';
import { abi } from './abis/RainbowToken.json';

// const contractAddress = networks[Object.keys(networks)[0]].address;
/* LOCAL */
const contractAddress = '0xf204a4ef082f5c04bb89f7d5e6568b796096735a';
/* ROPSTEN */
// const contractAddress = '0x38450358273ff0fdf12ceadb60eefd4ebd9614ee';

export const web3 = new Web3(Web3.givenProvider);

export const web3_event = new Web3('ws://localhost:8545');
// export const web3_event = new Web3(new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws"));
// export const web3_event = new Web3('wss://ropsten.infura.io/ws');
// export const web3_event_main = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));
// export const web3_event_rinkeby = new Web3(new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws"));

const RainbowToken = new web3.eth.Contract(abi, contractAddress);
export const RgbWallet_event = new web3_event.eth.Contract(abi, contractAddress).events;

export default {
  targetColor: () => RainbowToken.methods.tokenColor().call(),
  defaultBlendingPrice: () => RainbowToken.DEFAUT_BLENDING_PRICE.call(),
  getToken: playerAddress => RainbowToken.methods.getToken(playerAddress).call(),
  isPlayer: address => RainbowToken.methods.isPlayer(address).call(),
  getPlayers: () => RainbowToken.players.call(),
  play: address => {
    return RainbowToken.play().send({
      from: address,
      value: defaultBlendingPrice,
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
  autoBlend: address => {
    return RainbowToken.methods.autoBlend().send({
      from: address,
      value: defaultBlendingPrice,
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
  blend: (address, blendingAddress, blendingPrice, blendingR, blendingG, blendingB) => {
    return RainbowToken.methods.blend(blendingAddress, blendingPrice, blendingR, blendingG, blendingB).send({
      from: address,
      value: blendingPrice,
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
