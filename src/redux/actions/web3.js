export const SET_UP_WEB3 = 'SET_UP_WEB3';
export const setUpWeb3 = () => ({
  type: SET_UP_WEB3
})

export const ADD_CONTRACT = 'ADD_CONTRACT';
export const addContract = payload => ({
  type: ADD_CONTRACT,
  payload
})

export const EVENTS_SET = 'EVENTS_SET';
export const eventsSet = () => ({
  type: EVENTS_SET
})

export const SET_ACCOUNT = 'SET_ACCOUNT';
export const setAccount = payload => ({
  type: SET_ACCOUNT,
  payload
})

export const SET_NETWORK_ID = 'SET_NETWORK_ID';
export const setNetworkId = payload => ({
  type: SET_NETWORK_ID,
  payload
});

export const CHECK_NETWORK = 'CHECK_NETWORK';
export const checkNetwork = payload => ({
  type: CHECK_NETWORK,
  payload
})

export const CHECK_UNLOCKING_METAMASK = 'CHECK_UNLOCKING_METAMASK';
export const checkUnlockingMetamask = payload => ({
  type: CHECK_UNLOCKING_METAMASK,
  payload
})

export const SET_CONTRACT_METHODS = 'SET_CONTRACT_METHODS';
export const setContractMethods = payload => ({
  type: SET_CONTRACT_METHODS,
  payload
})

export const SET_CONTRACT_EVENTS = 'SET_CONTRACT_EVENTS';
export const setContractEvents = payload => ({
  type: SET_CONTRACT_EVENTS,
  payload
})

export const START_LOADING_WEB3 = 'START_LOADING_WEB3';
export const startLoadingWeb3 = () => ({
  type: START_LOADING_WEB3
})

export const END_LOADING_WEB3 = 'END_LOADING_WEB3';
export const endLoadingWeb3 = () => ({
  type: END_LOADING_WEB3
})
