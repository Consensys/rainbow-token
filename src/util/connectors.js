import Web3 from 'web3';
import { abi } from '../abis/RgbWallet.json';

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


const RgbWalletContract = new web3.eth.Contract(abi, contractAddress);
export const RgbWallet_event = new web3_event.eth.Contract(abi, contractAddress).events;

export const RgbWalletMethods = {
  getCurrentRgb: playerAddress => RgbWalletContract.methods.getCurrentRgb(playerAddress).call(),
  getDefaultRgb: playerAddress => RgbWalletContract.methods.getDefaultRgb(playerAddress).call(),
  isPlayer: address => RgbWalletContract.methods.isPlayer(address).call(),
  getPlayers: () => RgbWalletContract.methods.getPlayers().call(),
  play: address => {
    return RgbWalletContract.methods.play().send({
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
  blendWithYourself: address => {
    return RgbWalletContract.methods.blendWithYourself().send({
      from: address,
      value: web3.utils.toWei('0.02', 'ether')
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
  blendWithOthers: (address, otherAddress, otherR, otherG, otherB) => {
    return RgbWalletContract.methods.blendWithOthers(otherAddress, otherR, otherG, otherB).send({
      from: address,
      value: web3.utils.toWei('0.02', 'ether')
    })
    .on('transactionHash', hash => {
      console.log('Transaction hash: ', hash);
    })
    .on('receipt', receipt => {
      console.log('Receipt: ', receipt);
    })
    .on('error', err => {

    })
  }
}
