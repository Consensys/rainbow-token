import { eventChannel } from 'redux-saga';

export const formatViewFunction = (abi, methods) => {
  const viewFunctions = {};
  abi
    .filter(functionObject => functionObject.type === 'function')
    .filter(functionObject => functionObject.constant)
    .map(viewFunctionObject => {
      // let inputs = viewFunctionObject.inputs.map(input => input.name);
      // console.log('INPUTS', inputs);
      viewFunctions[viewFunctionObject.name] = () => console.log('hola');
      return true;
    });
  return viewFunctions;
}

export const transactionToEmitter = (transaction) => {
  return eventChannel(emitter => {
     transaction
        .on('transactionHash', txHash => {
            console.log('Transaction hash: ', txHash);
            emitter({ type: 'TRANSACTION_HASH', payload: txHash })
        })
        .on('receipt', receipt => {
            console.log('Receipt: ', receipt);
            emitter({ type: 'RECEIPT', payload: receipt })
        })
        .on('error', error => {
            console.log(error);
            emitter({ type: 'ERROR', payload: error })
        });
        return () => false;
  })
}

export const eventToEmitter = (ev) => {
  return eventChannel(emitter => {
    ev
      .on('data', event => {
          emitter({ ...event.returnValues });
      })
      .on('error', err => console.log(err));
      return () => false;
  })
}
