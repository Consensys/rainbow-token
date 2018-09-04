import {
  GET_USER,
  REQUEST_PLAYING,
  SET_USER,
  START_LOADING_USER,
  END_LOADING_USER,
  START_TRANSACTION,
  END_TRANSACTION,
  REQUEST_BLEND,
  SET_BLENDING_PRICE
} from '../actionTypes';

/********* ACTIONS *********/

export const getUser = () => ({
  type: GET_USER
});

export const startLoadingUser = () => ({
  type: START_LOADING_USER,
})

export const endLoadingUser = () => ({
  type: END_LOADING_USER,
})

export const setUser = (address) => ({
  type: SET_USER,
  payload: address
})

export const requestPlaying = () => ({
  type: REQUEST_PLAYING
})

export const startTransaction = () => ({
  type: START_TRANSACTION,
})

export const endTransaction = () => ({
  type: END_TRANSACTION,
})

export const setBlendingPrice = (price) => ({
  type: SET_BLENDING_PRICE,
  payload: price
})

export const requestBlend = (
  blendingAddress=undefined, 
  blendingToken=undefined
) => ({
  type: REQUEST_BLEND,
  payload: {
    blendingAddress,
    blendingToken,
  }
})
