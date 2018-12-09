import eventToEmitter from "./eventToEmitter";

export default (abi, contractWs) => {
    const returnedEvents = {};

    const eventsObjects = abi.filter(
        functionObject => functionObject.type === "event"
    );

    for (let eventObject of eventsObjects) {
        const subReturnedEvent = {};
        subReturnedEvent.listening = function() {
            const indexedInputs = eventObject.inputs.filter(
                input => input.indexed
            );
            const eventArgs = [...arguments].filter(
                (el, index) => index < indexedInputs.length
            );
            const blockFilterArgs = arguments[indexedInputs.length];
            const indexInputArgs = {};
            for (let i = 0; i < eventArgs.length; i++) {
                indexInputArgs[indexedInputs[i].name] = eventArgs[i];
            }
            return eventToEmitter(
                contractWs.events[eventObject.name]({
                    filter: indexInputArgs,
                    ...blockFilterArgs
                })
            );
        };

        subReturnedEvent.getPastEvents = function() {
            const indexedInputs = eventObject.inputs.filter(
                input => input.indexed
            );
            const eventArgs = [...arguments].filter(
                (el, index) => index < indexedInputs.length
            );
            const blockFilterArgs = arguments[indexedInputs.length];
            const indexInputArgs = {};
            for (let i = 0; i < eventArgs.length; i++) {
                indexInputArgs[indexedInputs[i].name] = eventArgs[i];
            }
            return contractWs.getPastEvents(eventObject.name, {
                filter: indexInputArgs,
                ...blockFilterArgs
            });
        };

        returnedEvents[eventObject.name] = subReturnedEvent;
    }

    return returnedEvents;
};
