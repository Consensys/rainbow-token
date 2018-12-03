import React from 'react';

/* Material-ui components */
import Settings from '@material-ui/icons/Settings';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    position: 'absolute',
    top: '20px',
    right: '0'
  }
})

const TransactionLoader = ({ txHash, classes }) => (
  <div id='transactionLoader' className={classes.global}>
    {txHash && (
      <Settings
        id='iconTransactionLoader'
        color='primary'
        fontSize='large'
      />
    )}
  </div>
)

export default withStyles(styles)(TransactionLoader);
