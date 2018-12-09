import rootReducer from "./reducers";
import {
    createStore as _createStore,
    applyMiddleware,
    compose as _compose
} from "redux";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";

// Enables redux-devtools extension
const compose =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _compose
        : _compose;

const createStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = _createStore(
        rootReducer,
        compose(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(mySaga);
    return store;
};

export default createStore;
