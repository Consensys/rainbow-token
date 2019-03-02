export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT';
export const updateAccount = (address, balance = 0) => ({
  type: UPDATE_ACCOUNT,
  payload: { address, balance }
});

export const SET_DEFAULT_ACCOUNT = 'SET_DEFAULT_ACCOUNT';
export const setDefaultAccount = address => ({
  type: SET_DEFAULT_ACCOUNT,
  payload: address
})
