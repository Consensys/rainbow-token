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
