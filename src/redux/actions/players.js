import { targetColor } from "../../web3/formatters/RainbowToken";
import { computeScore } from "../../utils";

/** ******* ACTIONS *********/

export const GET_PLAYERS = "GET_PLAYERS";
export const getPlayers = () => ({
    type: GET_PLAYERS
});

export const START_LOADING_PLAYERS = "START_LOADING_PLAYERS";
export const startLoadingPlayers = () => ({
    type: START_LOADING_PLAYERS
});

export const END_LOADING_PLAYERS = "END_LOADING_PLAYERS";
export const endLoadingPlayers = () => ({
    type: END_LOADING_PLAYERS
});

export const SET_PLAYERS = "SET_PLAYERS";
export const setPlayers = players => ({
    type: SET_PLAYERS,
    payload: players
});

export const ADD_PLAYER = "ADD_PLAYER";
export const addPlayer = player => ({
    type: ADD_PLAYER,
    payload: player
});

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
