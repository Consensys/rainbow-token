import React from 'react';

/* Material-ui component */
import Ballot from '@material-ui/icons/Ballot';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    minWidth: '5vw',
    width: 'fit-content',
    minHeight: '12vh',
    border: '.5px solid rgb(230, 230, 230)',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    color: 'rgb(30, 30, 30)',
    fontSize: '1.2em',
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    boxShadow: '1px 1px 2px rgba(10, 10, 10, 0.4)',
    flexDirection: 'column'
  },
  transactionsList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  anchor: {
    color: 'black',
    textDecoration: 'none'
  }
})

const Block = ({
  id,
  blockNumber,
  transactions,
  classes,
}) => (
  <div
    id={id}
    className={`${classes.global} box`}
  >
    <div className={classes.transactionsList}>
      {transactions && transactions.map(({ txHash, status }) => (
        <a
          key={txHash}
          href={`https://ropsten.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Ballot
            color={status ? 'secondary' : 'error'}
            fontSize='small'
          />
        </a>
      ))}
    </div>
    <a
      className={classes.anchor}
      target="_blank"
      rel="noopener noreferrer"
      href={`https://ropsten.etherscan.io/block/${blockNumber}`}
    >
      #{blockNumber}
    </a>
  </div>
)

export default withStyles(styles)(Block);
