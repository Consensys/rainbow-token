export const ADD_CONTRACT = 'ADD_CONTRACT';
export const addContract = (name, contract) => ({
  type: ADD_CONTRACT,
  payload: { name, contract }
});
