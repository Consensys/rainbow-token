import {
  GET_PLAYERS,
  START_LOADING_PLAYERS,
  END_LOADING_PLAYERS,
  SET_PLAYERS,
  UPDATE_PlAYER_TOKEN,
  NEW_PLAYER,
  ADD_PLAYER,
} from '../actionTypes';

/********* ACTIONS *********/

export const getPlayers = () => ({
  type: GET_PLAYERS
});

export const startLoadingPlayers = () => ({
  type: START_LOADING_PLAYERS,
})

export const endLoadingPlayers = () => ({
  type: END_LOADING_PLAYERS,
})

export const setPlayers = (players) => ({
  type: SET_PLAYERS,
  payload: players
})

export const newPlayer = (address) => ({
  type: NEW_PLAYER,
  payload: address
})

export const addPlayer = (player) => ({
  type: ADD_PLAYER,
  payload: player
})

export const updatePlayerToken  = (address, color=undefined, blendingPrice=undefined) => ({
  type: UPDATE_PlAYER_TOKEN,
  payload: {
    address,
    token: {
      color,
      score: color ? computeScore(color, rainbow.targetColor): undefined,
      blendingPrice,
    }
  }
})
