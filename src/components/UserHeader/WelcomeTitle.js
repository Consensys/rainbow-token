import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'column'
  },
  pseudo: {
    fontSize: '1.3em',
    textTransform: 'capitalize'
  },
  address: {
   marginTop: '0.5em'
 },
})

const WelcomeTitle = ({
  address,
  pseudo,
  classes
}) => (
  <div className={classes.global}>
    <div className={classes.pseudo}>
      Welcome <strong>{pseudo}</strong>
    </div>
    <div className={classes.address}>
      Address: {address.substring(0, 6)}...{address.substring(39, 42)}
    </div>
  </div>
)

export default withStyles(styles)(WelcomeTitle);
