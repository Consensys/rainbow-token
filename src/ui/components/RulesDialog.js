import React from 'react';

/* Styles */
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const RulesDialog = ({
  open,
  handleClose,
  scroll,
}) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
    >
      <DialogTitle id="scroll-dialog-title">Now What?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>
            By joining the game, you have been assigned a Rainbow Token with a
            random color. Your goal is to blend it with other Rainbow Tokens in
            order to reach the Consensys Rainbow Token. How does it work?
          </p>
          <p>
            By blending your token with another one, only your token changes,
            not the one of the target. However, in order to blend with someone
            else, you have to pay the blending price set by the player himself.
            Half of the ether you sent goes to the target player, the other half
            goes to a common pot.
          </p>
          <p>
            You may also blend your token with your default color which you
            began with. The blending price is here fixed to 0.01 ether and
            everything goes to the common pot.
          </p>
          <p>
            If you succeed and reach the Consensys Rainbow Token, you may claim
            victory and the common pot is now yours. Unfortunately this feature
            is not yet displayed at the front end level so please, ask someone who
            knows how to send transactions from somewhere else :).<br/>
            <a href='https://github.com/ConsenSys/rainbow-token'>Here</a> is the
            link to the GitHub for the winner and the curious ones!
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

export default RulesDialog;
