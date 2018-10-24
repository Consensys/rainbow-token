import { eventChannel } from "redux-saga";

export default (ev) => {
    return eventChannel(emitter => {
        ev
            .on("data", event => {
                console.log("event", event);
                console.log("event", event.returnValues);
                emitter({ ...event.returnValues });
            })
            .on("error", err => console.log(err));
        return () => false;
    });
};
