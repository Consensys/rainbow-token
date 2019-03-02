// Activators

export const REQUEST_PLAY = 'REQUEST_PLAY';
export const requestPlay = () => ({
  type: REQUEST_PLAY
});

export const REQUEST_SET_BLENDING_PRICE = 'REQUEST_SET_BLENDING_PRICE';
export const requestSetBlendingPrice = newPrice => ({
  type: REQUEST_SET_BLENDING_PRICE,
  payload: newPrice
})

export const REQUEST_BLEND = "REQUEST_BLEND";
export const requestBlend = (
    blendingAddress = undefined,
    blendingToken = undefined
) => ({
    type: REQUEST_BLEND,
    payload: {
        blendingAddress,
        blendingToken
    }
});

// Setter

export const SET_USER_AS_PLAYER = 'SET_USER_AS_PLAYER';
export const setUserAsPlayer = () => ({
  type: SET_USER_AS_PLAYER
})

export const REMOVE_USER_AS_PLAYER = 'REMOVE_USER_AS_PLAYER';
export const removeUserAsPlayer = () => ({
  type: REMOVE_USER_AS_PLAYER
});
