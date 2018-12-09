import React from "react";

/* Containers */
import UserSpace from "../../containers/Topbar/UserSpace";
import ConsenSysElement from "../../containers/Topbar/ConsenSysElement";
import PriceSelector from "../../containers/Topbar/PriceSelector";
import DefaultBlend from "../../containers/Topbar/DefaultBlend";

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    global: {
        color: "white",
        width: "100%",
        height: "100px",
        position: "sticky",
        top: 0,
        zIndex: 4
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "78px"
    },
    hr: {
        margin: "10px",
        border: "none",
        height: "2px",
        background:
            "linear-gradient(-45deg, #ff0000 0%,#ffff00 25%,#00ff00 50%,#00ffff 75%,#0000ff 100%)"
    }
});

const Topbar = ({ classes }) => (
    <div className={classes.global}>
        <div className={classes.header}>
            <UserSpace />
            <DefaultBlend />
            <PriceSelector />
            <ConsenSysElement />
        </div>
        <hr className={classes.hr} />
    </div>
);

export default withStyles(styles)(Topbar);
