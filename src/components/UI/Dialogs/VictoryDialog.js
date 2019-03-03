// Libs
import React from "react";
import PropTypes from 'prop-types';

/* Material ui components */
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const VictoryDialog = ({
    open,
    requestClaimVictory
}) => (
    <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
    >
        <DialogTitle>YOU HAVE WON !!</DialogTitle>
        <DialogContent>
          <h1> First person ever to have won this game, you're the best!</h1>
          <Button
              onClick={requestClaimVictory}
              color="primary"
              variant='contained'
          >
              CLAIM YOUR VICTORY
          </Button>
        </DialogContent>
    </Dialog>
);

VictoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  requestClaimVictory: PropTypes.func.isRequired,
}

export default VictoryDialog;
