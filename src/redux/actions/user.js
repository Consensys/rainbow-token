export const GET_USER_STATUS = 'GET_USER_STATUS';
export const getUserStatus = () => ({
  type: GET_USER_STATUS
})

export const SET_USER_AS_PLAYER = 'SET_USER_AS_PLAYER';
export const setUserAsPlayer = () => ({
  type: SET_USER_AS_PLAYER,
})

export const GET_USER = 'GET_USER';
export const getUser = () => ({
    type: GET_USER,
});

export const START_LOADING_USER = 'START_LOADING_USER';
export const startLoadingUser = () => ({
    type: START_LOADING_USER,
});

export const END_LOADING_USER = 'END_LOADING_USER';
export const endLoadingUser = () => ({
    type: END_LOADING_USER,
});

export const SET_USER = 'SET_USER';
export const setUser = (address) => ({
    type: SET_USER,
    payload: address,
});

export const START_TRANSACTION = 'START_TRANSACTION';
export const startTransaction = (txHash) => ({
    type: START_TRANSACTION,
    payload: txHash
});

export const END_TRANSACTION = 'END_TRANSACTION';
export const endTransaction = () => ({
    type: END_TRANSACTION,
});

export const SET_BLENDING_PRICE = 'SET_BLENDING_PRICE';
export const setBlendingPrice = (price) => ({
    type: SET_BLENDING_PRICE,
    payload: price,
});

export const START_PLAYING = 'START_PLAYING';
export const startPlaying = () => ({
  type: START_PLAYING,
});

export const REQUEST_BLEND = 'REQUEST_BLEND';
export const requestBlend = (
    blendingAddress = undefined,
    blendingToken = undefined
) => ({
    type: REQUEST_BLEND,
    payload: {
        blendingAddress,
        blendingToken,
    },
});
