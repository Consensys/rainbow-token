// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Material Components
import { Snackbar } from '@material-ui/core';

// Styles
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  snack: {
    marginBottom: '10px',
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
  }
})

const TransactionSnackbar = ({ classes, txInProgress, address }) => (
  <Snackbar
    className={classes.snack}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    open={txInProgress}
    ContentProps={{
      'aria-describedby': 'transaction-snack',
    }}
    message={(
        <a
            className={classes.message}
            id="transaction-snack"
            href={`https://ropsten.etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
        >
          Transaction In Progress
        </a>
    )}
  />
)

TransactionSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  txInProgress: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
}

export default withStyles(styles)(TransactionSnackbar);
