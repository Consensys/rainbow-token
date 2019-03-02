// Setters

export const SET_ETH = 'SET_ETH';
export const setEth = eth => ({
  type: SET_ETH,
  payload: eth
})

export const FILL_NETWORK = 'FILL_NETWORK';
export const fillNetwork = (networkKeys) => ({
  type: FILL_NETWORK,
  payload: networkKeys
})

export const SUCCESSFUL_SET_UP = 'SUCCESSFUL_SET_UP';
export const successfulSetUp = () => ({
  type: SUCCESSFUL_SET_UP
})


// Loading

export const START_LOADING_WEB3 = 'START_LOADING_WEB3';
export const startLoadingWeb3 = () => ({
  type: START_LOADING_WEB3
})

export const END_LOADING_WEB3 = 'END_LOADING_WEB3';
export const endLoadingWeb3 = () => ({
  type: END_LOADING_WEB3
});
