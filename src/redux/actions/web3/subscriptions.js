export const SUBSCRIBE = 'SUBSCRIBE';
export const subscribe = (id, callback) => ({
  type: SUBSCRIBE,
  payload: { id, callback }
});

export const UNSUBSCRIBE = 'UNSUBSCRIBE';
export const unsubscribe = id => ({
  type: UNSUBSCRIBE,
  payload: id
});
