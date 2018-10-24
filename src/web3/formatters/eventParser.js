import eventToEmitter from "./eventToEmitter";

export default (abi, contractWs) => {
    const returnedEvents = {
        listening: {},
        getPastEvents: {}
    };

    const eventsObjects = abi.filter(
        functionObject => functionObject.type === "event"
    );

    for (let eventObject of eventsObjects) {
        returnedEvents.listening[eventObject.name] = function() {
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

        returnedEvents.getPastEvents[eventObject.name] = function() {
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
    }

    return returnedEvents;
};
