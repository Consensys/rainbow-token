// import { eventChannel } from 'redux-saga';
// import { select} from 'redux-saga/effects';
//
// // import { RainbowTokenWs } from '../../web3';
//
//
// export function* blendingPriceSetEmitter() {
//   const RainbowEvents = yield select(state => state.web3.contracts.events.RainbowToken);
//   return eventChannel(emitter => {
//     RainbowEvents.BlendingPriceSet({}, undefined)
//       .on('data', event => {
//           const { player, price } = event.returnValues;
//           emitter({ player, price });
//       })
//       .on('error', err => console.log(err));
//       return () => false;
//   })
// }
//
// export function* tokenBlendedEmitter() {
//   const RainbowEvents = yield select(state => state.web3.contracts.events.RainbowToken);
//   return eventChannel(emitter => {
//     RainbowEvents.TokenBlended({}, undefined)
//         .on('data', event => {
//             const { player, r, g, b } = event.returnValues;
//             emitter({ player, r, g, b });
//         })
//         .on('error', console.log);
//       return () => false;
//   })
// }
//
// export function* playerCreatedEmitter() {
//   const RainbowEvents = yield select(state => state.web3.contracts.events.RainbowToken);
//   return eventChannel(emitter => {
//     RainbowEvents.PlayerCreated({}, undefined)
//         .on('data', event => {
//             const { player, r, g, b, blendingPrice } = event.returnValues;
//             const token = {
//               blendingPrice,
//               color: { r, g, b},
//               defaultColor: { r, g, b }
//             };
//             emitter({ address: player, token });
//         })
//         .on('error', console.log);
//       return () => false;
//   })
// }
//
// export function* playerWonEmitter() {
//   const RainbowEvents = yield select(state => state.web3.contracts.events.RainbowToken);
//   return eventChannel(emitter => {
//     RainbowEvents.PlayerWon({}, undefined)
//         .on('data', event => {
//             const { player } = event.returnValues;
//             emitter({ player });
//         })
//         .on('error', console.log);
//       return () => false;
//   })
// }
