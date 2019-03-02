// Libs
import { select, call, take, all } from 'redux-saga/effects';


// Utils
import { eventToEmitter, waitForActivator, toPromise } from './utils';

export function* subscribeToEvent(
  {
    contract,
    event,
    filter = {},
    callbacks = [],
    ...options
  },
  activator,
  numberOfTimes
) {
  // Wait for the activator (default SUCCESSFUL_SET_UP)
  yield call(waitForActivator, activator);

  // If callbacks is a function, wrap it in an array
  callbacks = (callbacks instanceof Function) ? [callbacks] : callbacks;

  // Get the event from store
  const { [event]: targetedEvent } = yield select(
    state => state.web3.contracts[contract].events
  )

  // Build the channel
  const chan = yield call(
    eventToEmitter,
    targetedEvent(
      {
        filter,
        ...options
      }
    )
  );

  // Listen to the channel while the condition is satisfied
  let i = 0;

  while (numberOfTimes ? i < numberOfTimes : true) {
      if (i === numberOfTimes) {
        return;
      }
      const { returnValues, ...metadata } = yield take(chan);
      yield all(callbacks.map(callback => call(callback, returnValues, metadata)));
      i++;
  }
}

export function* waitForEvent(
  {
    contract,
    event,
    filter = {},
    callbacks = [],
    ...options
  }
) {
  // If callbacks is a function, wrap it in an array
  callbacks = (callbacks instanceof Function) ? [callbacks] : callbacks;

  // Get the targeted contract from store
  const { [contract]: targetedContract } = yield select(
    state => state.web3.contracts
  );

  const { returnValues, ...metadata } = yield call(
    toPromise(targetedContract, 'once'),
    event,
    {
      filter,
      ...options
    }
  )
  yield all(callbacks.map(callback => call(callback, returnValues, metadata)));

  return { returnValues, metadata };
}

export function* getPastEvents({
  contract,
  event,
  filter = {},
  ...options
}) {
  const { [contract]: targetedContract } = yield select(
    state => state.web3.contracts
  );

  const pastEvents = yield call(
    [
      targetedContract,
      'getPastEvents'
    ],
    event,
    {
      filter,
      fromBlock: 0,
      toBlock: 'latest',
      ...options
    }
  )

  return pastEvents
}
