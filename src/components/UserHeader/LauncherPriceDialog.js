import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  global: {
    height: '30px',
    marginTop: '1.8em',
    fontSize: '0.8em'
  }
})

const LauncherPriceDialog = ({
  disabled,
  onClick,
  classes
}) => (
  <Button
    className={classes.priceBtn}
    variant='contained'
    color='primary'
    onClick={onClick}
    disabled={disabled}
  >
    Set blending price
  </Button>
)

export default withStyles(styles)(LauncherPriceDialog);
