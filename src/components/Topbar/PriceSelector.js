// Libs
import React from "react";
import Web3 from 'web3';
import PropTypes from 'prop-types';

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
            {Web3.utils.fromWei(blendingPrice, 'ether')} <i className="fab fa-ethereum" />
        </Button>
    </div>
);

PriceSelector.propTypes = {
  blendingPrice: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PriceSelector);
