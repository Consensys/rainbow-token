/****** FETCHER ******/

export const GET_USER_STATUS = "GET_USER_STATUS";
export const getUserStatus = () => ({
    type: GET_USER_STATUS
});

/****** SETTER ******/

export const SET_USER_AS_PLAYER = "SET_USER_AS_PLAYER";
export const setUserAsPlayer = () => ({
    type: SET_USER_AS_PLAYER
});

/****** LOADING ******/

export const START_LOADING_USER = "START_LOADING_USER";
export const startLoadingUser = () => ({
    type: START_LOADING_USER
});

export const END_LOADING_USER = "END_LOADING_USER";
export const endLoadingUser = () => ({
    type: END_LOADING_USER
});
