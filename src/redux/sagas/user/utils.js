import { call, select } from "redux-saga/effects";

/* Helpers */
import transactionHandler from "../utils/transactionHandler";

function* transaction(contractName, methodName, ...methodArgs) {
    try {
        const {
            contracts: {
                [contractName]: {
                    transactions: { [methodName]: method }
                }
            },
            account: { address }
        } = yield select(state => state.web3);
        const txArgsPosition =
            methodArgs[methodArgs.length - 1] instanceof Object
                ? methodArgs.length - 1
                : methodArgs[methodArgs.length - 2] instanceof Object
                    ? methodArgs.length - 2
                    : null;
        const updatedArgs =
            txArgsPosition || txArgsPosition === 0
                ? methodArgs.map((arg, index) => {
                      if (index === txArgsPosition) {
                          if (arg.from) {
                              return arg;
                          } else {
                              return {
                                  ...arg,
                                  from: address
                              };
                          }
                      } else {
                          return arg;
                      }
                  })
                : [...methodArgs, { from: address }];
        const chan = yield call(method, ...updatedArgs);
        yield call(transactionHandler, chan);
    } catch (err) {
        console.log("error", err);
    }
}

export { transaction };
