/*********** NETWORK ***********/

export const SET_NETWORK = 'SET_NETWORK';
export const setNetwork = payload => ({
  type: SET_NETWORK,
  payload
});

export const CHECK_NETWORK = 'CHECK_NETWORK';
export const checkNetwork = payload => ({
  type: CHECK_NETWORK,
  payload
})

/*********** ACCOUNT ***********/

export const SET_ACCOUNT = 'SET_ACCOUNT';
export const setAccount = address => ({
  type: SET_ACCOUNT,
  payload: address
})

export const CHECK_UNLOCKING_METAMASK = 'CHECK_UNLOCKING_METAMASK';
export const checkUnlockingMetamask = payload => ({
  type: CHECK_UNLOCKING_METAMASK,
  payload
})

/*********** CONTRACT ***********/

export const ADD_CONTRACT = 'ADD_CONTRACT';
export const addContract = payload => ({
  type: ADD_CONTRACT,
  payload
})

export const EVENTS_SET = 'EVENTS_SET';
export const eventsSet = () => ({
  type: EVENTS_SET
})

/*********** LOADING ***********/

export const START_LOADING_WEB3 = 'START_LOADING_WEB3';
export const startLoadingWeb3 = () => ({
  type: START_LOADING_WEB3
})

export const END_LOADING_WEB3 = 'END_LOADING_WEB3';
export const endLoadingWeb3 = () => ({
  type: END_LOADING_WEB3
})
