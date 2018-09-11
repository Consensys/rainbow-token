import { eventChannel } from 'redux-saga';

import { RainbowTokenWs } from '../../web3';


export function blendingPriceSetEmitter() {
  return eventChannel(emitter => {
    RainbowTokenWs.BlendingPriceSet({}, undefined)
      .on('data', event => {
          const { player, price } = event.returnValues;
          emitter({ player, price });
      })
      .on('error', err => console.log(err));
      return () => false;
  })
}

export function tokenBlendedEmitter() {
  return eventChannel(emitter => {
    RainbowTokenWs.TokenBlended({}, undefined)
        .on('data', event => {
            const { player, r, g, b } = event.returnValues;
            emitter({ player, r, g, b });
        })
        .on('error', console.log);
      return () => false;
  })
}

export function playerCreatedEmitter() {
  return eventChannel(emitter => {
    RainbowTokenWs.PlayerCreated({}, undefined)
        .on('data', event => {
            const { player } = event.returnValues;
            emitter({ player });
        })
        .on('error', console.log);
      return () => false;
  })
}

export function playerWonEmitter() {
  return eventChannel(emitter => {
    RainbowTokenWs.PlayerWon({}, undefined)
        .on('data', event => {
            const { player } = event.returnValues;
            emitter({ player });
        })
        .on('error', console.log);
      return () => false;
  })
}
