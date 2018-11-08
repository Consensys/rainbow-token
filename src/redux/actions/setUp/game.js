export const INITIALIZE_GAME = 'INITIALIZE_GAME';
export const initializeGame = () => ({
  type: INITIALIZE_GAME
})

export const GAME_INITIALIZED = 'GAME_INITIALIZED';
export const gameInitialized = () => ({
  type: GAME_INITIALIZED
})

/*********** LOADING ***********/

export const START_INITIALIZATION = 'START_INITIALIZATION';
export const startInitialization = () => ({
  type: START_INITIALIZATION
})

export const END_INITIALIZATION = 'END_INITIALIZATION';
export const endInitialization = () => ({
  type: END_INITIALIZATION
})
