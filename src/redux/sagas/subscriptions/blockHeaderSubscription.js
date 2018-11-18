import { eventChannel } from 'redux-saga';
import { select, put, take, call } from 'redux-saga/effects';

import {
  EVENTS_SET,
  newBlockHeader
} from '../../actions/setUp/web3';

import {
  addError
} from '../../actions/errors';

function* blockHeaderSubscription() {
  const { eth } = yield select(
    state => state.web3.network
  );
  const { number, timestamp } = yield call([eth, 'getBlock'], 'latest');
  yield put(newBlockHeader({ number, timestamp }));
  // Subscribe to block headers
  return eventChannel(emitter => {
    const subscription = eth.subscribe('newBlockHeaders', console.log)
      .on('data', ({
        number,
        timestamp
      }) => {
        console.log('New Block: ', number);
        emitter({
          type:'NEW_BLOCK_HEADER',
          payload: {
            number,
            timestamp
          }
        })
      })
      .on('error', err => emitter({
        type: 'ERROR',
        err
      }));

    return subscription.unsubscribe;
  })
}

export default function*() {
  try {
    // Not optimal
    yield take(EVENTS_SET);
    const chan = yield call(blockHeaderSubscription);
    while(true) {
      let { type, payload } = yield take(chan);
      switch (type) {
        case 'NEW_BLOCK_HEADER':
          yield put(newBlockHeader(payload));
          break;
        case 'ERROR':
          console.log('Error:', payload);
          chan.close();
          break;
        default:
          chan.close();
      }
    }
  } catch(err) {
    console.log(err);
    yield put(addError('Unable to listen to new blocks.'));
  }
}
