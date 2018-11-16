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
   marginTop: '0.4em'
 },
  balance: {
   marginTop: '0.4em'
 },
})

const WelcomeTitle = ({
  address,
  pseudo,
  balance,
  classes
}) => (
  <div className={classes.global}>
    <div className={classes.pseudo}>
      Welcome <strong>{pseudo}</strong>
    </div>
    <div className={classes.address}>
      Address: {address.substring(0, 6)}...{address.substring(39, 42)}
    </div>
    <div className={classes.balance}>
      Balance: {balance} <i className="fab fa-ethereum"></i>
    </div>
  </div>
)

export default withStyles(styles)(WelcomeTitle);
