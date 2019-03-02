// Libs
import { eventChannel, END } from 'redux-saga';
import { take } from 'redux-saga/effects';

// Actions
import {
  SUCCESSFUL_SET_UP
} from '../../../../actions/web3/setUp';

export const eventToEmitter = ev => {
    return eventChannel(emitter => {
        ev
        .on("data", event => {
            emitter({ ...event });
        })
        .on("error", err => {
          console.log('Error during listening of event: ', err)
          emitter(END);
        });
        return () => ev.off();
    });
};

export function* waitForActivator(activator) {
  if (activator) {
    yield take(activator);
  } else {
    yield take(SUCCESSFUL_SET_UP)
  }
}

export const toPromise = (module, method) => {
  const bindedFunc = module[method].bind(module);
  return (...args) => {
    return new Promise((resolve, reject) => {
      bindedFunc(...args, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
    })
  }
}
