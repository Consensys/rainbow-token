import React from "react";

/* Material ui components */
import { Button } from "@material-ui/core";

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    btn: {
        marginTop: "1.5em"
    }
});

const StartPlayingButton = ({ classes, onClick, disabled }) => (
    <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={disabled}
    >
        Start playing
    </Button>
);

export default withStyles(styles)(StartPlayingButton);
