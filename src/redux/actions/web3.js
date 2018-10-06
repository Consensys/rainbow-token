import {
  SET_UP_WEB3,
  SET_WEB3,
  START_LOADING_WEB3,
  END_LOADING_WEB3
} from '../actionTypes';

export const setUpWeb3 = () => ({
  type: SET_UP_WEB3
})

export const setWeb3 = payload => ({
  type: SET_WEB3,
  payload
})

export const startLoadingWeb3 = () => ({
  type: START_LOADING_WEB3
})

export const endLoadingWeb3 = () => ({
  type: END_LOADING_WEB3
})
