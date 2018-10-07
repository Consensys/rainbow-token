export const ADD_ERROR = 'ADD_ERROR';
export const addError = error => ({
    type: ADD_ERROR,
    payload: error,
});

export const REMOVE_ERROR = 'REMOVE_ERROR'
export const removeError = () => ({
    type: REMOVE_ERROR,
});
