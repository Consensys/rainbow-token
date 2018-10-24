export default (abi, methods) => {
    const returnedCalls = {};

    const viewFunctions = abi
        .filter(functionObject => functionObject.type === "function")
        .filter(functionObject => functionObject.stateMutability === "view");
    for (let functionObject of viewFunctions) {
        returnedCalls[functionObject.name] = function() {
            const methodArgs = [...arguments].filter(
                (el, index) => index !== arguments.length - 1
            );
            const txArg = arguments[functionObject.inputs.length];
            const txObject = methods[functionObject.name].apply(
                null,
                methodArgs
            );
            return txObject.call(txArg);
        };
    }

    return returnedCalls;
};
