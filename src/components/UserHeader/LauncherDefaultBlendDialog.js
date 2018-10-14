import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  global: {
    fontSize: '0.7em',
    height: '30px',
    marginTop: '1em'
  }
})

const LauncherDefaultBlendDialog = ({
  disabled,
  onClick,
  classes
}) => (
  <Button
    className={classes.global}
    variant='contained'
    color='primary'
    onClick={onClick}
    disabled={disabled}
  >
    Blend with your default color
  </Button>
);

export default withStyles(styles)(LauncherDefaultBlendDialog);
