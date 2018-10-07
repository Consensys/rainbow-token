import { computeToken, color } from './utils';
import { transactionToEmitter, eventToEmitter } from './formatter';

const targetColor = color([44, 86, 221]);
const defaultBlendingPrice = 10000000000000000;

export default (methods, events) => ({
  constants: {
    targetColor,
    defaultBlendingPrice
  },
  call: {
    getToken: playerAddress => methods.getToken(playerAddress).call().then(computeToken),
    isPlayer: address => methods.isPlayer(address).call(),
    getPlayers: () => methods.getPlayers().call(),
  },
  transactions: {
    play: address => transactionToEmitter(
      methods.play().send({
        from: address,
        value: defaultBlendingPrice
      })
    ),
    setBlendingPrice: (address, price) => transactionToEmitter(
      methods.setBlendingPrice(price).send({
        from: address,
      })
    ),
    blend: (address, blendingAddress, blendingToken) => transactionToEmitter(
      methods.blend(
        blendingAddress,
        blendingToken.blendingPrice,
        blendingToken.color.r,
        blendingToken.color.g,
        blendingToken.color.b
      ).send({
        from: address,
        value: blendingToken.blendingPrice,
      })
    ),
    defaultBlend: address => transactionToEmitter(
      methods.defaultBlend().send({
        from: address,
        value: defaultBlendingPrice,
      })
    ),
    claimVictory: address => transactionToEmitter(
      methods.claimVictory().send({
          from: address,
      })
    )
  },
  events: {
    blendingPriceSet: () => eventToEmitter(
      events.BlendingPriceSet({}, undefined)
    ),
    tokenBlended: () => eventToEmitter(
      events.TokenBlended({}, undefined)
    ),
    playerCreated: () => eventToEmitter(
      events.PlayerCreated({}, undefined)
    ),
    playerWon: () => eventToEmitter(
      events.PlayerWon({}, undefined)
    )
  }
})
