import { abi, networks as rainbowNetworks  } from './abis/RainbowToken';
import RainbowTokenFormatter from './formatters/RainbowToken';

export default {
  networks: {
    '3': 'wss://ropsten.infura.io/ws',
    '90451': 'ws://localhost:7545'
  },
  contracts: {
    RainbowToken: {
      abi,
      address: {
        '3': rainbowNetworks['3'].address,
        '90451': rainbowNetworks['90451'].address
      },
      formatter: RainbowTokenFormatter
    }
  }
};
