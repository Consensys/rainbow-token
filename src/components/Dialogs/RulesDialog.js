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
  closeDialog,
  scroll,
}) => (
  <div>
    <Dialog
      open={open}
      onClose={closeDialog}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
    >
      <DialogTitle id="scroll-dialog-title">Now What?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            When joining the game, you have been assigned your Rainbow Token with a default color.
            This token is the only you will ever owns in this game.
          </DialogContentText>
          <DialogContentText>
            You can change the color of your token by blending it with Rainbow tokens owned by other players.
            Each time you blend you need to contribute to a common pot.
          </DialogContentText>
          <DialogContentText>
            If you succeed in giving your token the target color: ConsenSys blue (#2c56dd)
            you will be allowed to claim victory and collect the entire common pot.
          </DialogContentText>
          <DialogContentText>
            Below are the 4 possible actions you can perform in this game
          </DialogContentText>
          <h3>1. Blend</h3>
          <DialogContentText>
            At any time you can blend your token with another player's token.
            When blending your token color will transform into the mixed color.
          </DialogContentText>
          <DialogContentText>
            When blending you need to pay a fee in ETH. This fee is split: half goes to the other player, half goes to the common pot.
          </DialogContentText>
          <DialogContentText>
            <em>Remark: when blending only the color of the player that requested the blend changes, other player's token remains unchanged.</em>
          </DialogContentText>
          <h3>2. Set your blending Price</h3>
          <DialogContentText>
            Your blending price is the price other players need to pay you to blend with your token.
          </DialogContentText>
          <DialogContentText>
            Typically a player having a token which color is closed to the target color will raise price.
          </DialogContentText>
          <h3>3. Blend with your default Color</h3>
          <DialogContentText>
            At any time you can blend your token with your default color (the one you
            started the game with).
          </DialogContentText>
          <DialogContentText>
            When blending with your default color you need to pay a fee of 0.01 ETH to the common pot.
          </DialogContentText>
          <h3>4. Claim Victory</h3>
          <DialogContentText>
            If you succeed in giving your token the target color: ConsenSys blue (#2c56dd), you may claim
            victory and the common pot is yours!
          </DialogContentText>
          <DialogContentText>
            <em>Disclaimer: Scatterbrain as we are we forgot to implement a button that allow to claim victory...
            So you will need to find another to claim victory... :-) Everything you need to know is in
            <a href='https://github.com/ConsenSys/rainbow-token'> Rainbow-Token GitHub</a> repository.</em>
          </DialogContentText>
        </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

export default RulesDialog;
