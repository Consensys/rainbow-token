/*********** LOADING ***********/

export const START_LOADING_RAINBOW = 'START_LOADING_RAINBOW';
export const startLoadingRainbow = () => ({
  type: START_LOADING_RAINBOW
});

export const END_LOADING_RAINBOW = 'END_LOADING_RAINBOW';
export const endLoadingRainbow = () => ({
  type: END_LOADING_RAINBOW
});


/*********** GAME ***********/

export const NEW_RAINBOW_SET = 'NEW_RAINBOW_SET';
export const newRainbowSet = () => ({
  type: NEW_RAINBOW_SET
});

/*********** USER RELATED ***********/

export const SET_USER_AS_PLAYER = 'SET_USER_AS_PLAYER';
export const setUserAsPlayer = () => ({
  type: SET_USER_AS_PLAYER,
});
