import React from "react";

/* Material ui components */
import Button from "@material-ui/core/Button";

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    global: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        fontSize: "1em",
        marginBottom: ".4em",
        textShadow: "0px 0px 4.5px rgb(0, 0, 0)"
    },
    btn: {
        // fontSize: '0.7em'
    }
});

const PriceSelector = ({ blendingPrice, disabled, onClick, classes }) => (
    <div className={classes.global}>
        <div className={classes.title}>
            <strong>Blending Price</strong>
        </div>
        <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={onClick}
            disabled={disabled}
        >
            {blendingPrice} <i className="fab fa-ethereum" />
        </Button>
    </div>
);

export default withStyles(styles)(PriceSelector);
