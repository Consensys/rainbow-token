import { computeScore } from "../../utils";
import { targetColor } from '../../constants';

// LOADERS

export const START_LOADING_PLAYERS = 'START_LOADING_PLAYERS';
export const startLoadingPlayers = () => ({
  type: START_LOADING_PLAYERS
})

export const END_LOADING_PLAYERS = 'END_LOADING_PLAYERS';
export const endLoadingPlayers = () => ({
  type: END_LOADING_PLAYERS
})

// SETTERS
export const SET_PLAYERS = 'SET_PLAYERS';
export const setPlayers = players => ({
  type: SET_PLAYERS,
  payload: players
})

export const ADD_PLAYER = 'ADD_PLAYER';
export const addPlayer = newPlayer => ({
  type: ADD_PLAYER,
  payload: newPlayer
})

export const UPDATE_PLAYER_TOKEN = "UPDATE_PLAYER_TOKEN";
export const updatePlayerToken = (
    address,
    color = undefined,
    blendingPrice = undefined
) => ({
    type: UPDATE_PLAYER_TOKEN,
    payload: {
        address,
        score: color ? computeScore(color, targetColor) : undefined,
        token: {
            color,
            blendingPrice
        }
    }
});
