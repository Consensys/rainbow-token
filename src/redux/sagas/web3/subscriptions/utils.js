// Libs
import { eventChannel } from 'redux-saga';
import { select, call, put } from 'redux-saga/effects';

// Actions
import { newBlockHeader } from '../../../actions/web3/blocks';


export const metamaskAccountSubscription = () => {
    return eventChannel(emitter => {
        window.ethereum.on("accountsChanged", ([address]) => {
            emitter({ address });
        });
        return () => false;
    });
}

export function* blockHeaderSubscription() {
  // Get the eth object
  const { eth } = yield select(
    state => state.web3
  );

  // Initialize blocks
  const blockHeader = yield call(
    [eth, 'getBlock'],
    'latest'
  );
  yield put(newBlockHeader({ ...blockHeader }));

  // Return the channel
  return eventChannel(
    emitter => {
      const subscription = eth
        .subscribe('newBlockHeaders')
        .on('data', blockHeader => emitter({
          type: 'NEW_BLOCK_HEADER',
          payload: blockHeader
        }))
        .on('error', err => emitter({
          type: 'ERROR',
          payload: err
        }))
      return subscription.unsubscribe;
    }
  )
}
