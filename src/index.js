import React, { Fragment } from "react";
import ReactDOM from "react-dom";

/* Containers & Components */
import App from "./App";

/* Styles */
import "./App.css";
import CssBaseline from "@material-ui/core/CssBaseline";

/* Methods & Functions */
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <Fragment>
        <CssBaseline />
        <App />
    </Fragment>,
    document.getElementById("root")
);
registerServiceWorker();
