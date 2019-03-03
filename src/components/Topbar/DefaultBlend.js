// Libs
import React from "react";
import PropTypes from 'prop-types';

/* Components */
import DefaultToken from "../UI/Token/Token";

/* Styles */
import { withStyles } from "@material-ui/core/styles";

/* Material ui components */
import Button from "@material-ui/core/Button";

const styles = theme => ({
    global: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    title: {
        marginBottom: ".4em",
        fontSize: "1em",
        textShadow: "0px 0px 4px rgb(10, 10, 10)"
    },
    btn: {
        // fontSize: '0.7em',
    }
});

const DefaultBlend = ({
  defaultColor,
  disabled,
  onClick,
  classes
}) => (
    <div className={classes.global}>
        <div className={classes.title}>
            <strong>Default Color</strong>
        </div>
        <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={onClick}
            disabled={disabled}
        >
            <span style={{ marginRight: ".4em" }}>Blend</span>
            <DefaultToken
                color={defaultColor}
                size="20"
                boxShadowSize="0"
                borderSize=".6"
            />
        </Button>
    </div>
);

DefaultBlend.propTypes = {
  defaultColor: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DefaultBlend);
