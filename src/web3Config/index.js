// Abis
import { abi as RainbowTokenAbi } from './abis/RainbowToken.json'

export default {
  defaultProvider: 'wss://ropsten.infura.io/ws',
  contracts: [
    {
      name: 'RainbowToken',
      abi: RainbowTokenAbi,
      // Dev
      // address: '0xC61431eb6c69189F844A595234Ce331B7C8A7A77',
      // Ropsten
      address: '0x1266af25494414936AF6c9778EDDCE7ce3dedcd5'
    },
  ]
}
