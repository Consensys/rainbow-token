import React from 'react';

/* Containers */
import TransactionLoader from '../../containers/Sidebar/TransactionLoader';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative'
  },
  boxes: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 'calc(100vh - 100px)',
  },
  box: {
    width: 'fit-content',
    height: '10vh',
    border: '.5px solid rgb(230, 230, 230)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    color: 'rgb(30, 30, 30)',
    fontSize: '1.2em',
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    boxShadow: '1px 1px 2px rgba(10, 10, 10, 0.4)',
  },
  anchor: {
    color: 'black',
    textDecoration: 'none'
  }
})


const Sidebar = ({
  blockNumber,
  prevBlock0Transactions,
  prevBlock1Transactions,
  prevBlock2Transactions,
  classes
}) => (
  <div id='blockNumberLoader' className={classes.global}>
    <TransactionLoader />
    <div className={classes.boxes}>
      <div
        id='futurBlock'
        className={`${classes.box} box`}
      >
        #{blockNumber + 1}
      </div>
      <div
        id='currentBlock'
        className={`${classes.box} box`}
      >
        <div>
          {prevBlock0Transactions.map(transaction => (
            <span>X</span>
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
      <div
        id='prevBlock1'
        className={`${classes.box} box`}
      >
      <div>
        {prevBlock1Transactions.map(transaction => (
          <span>X</span>
        ))}
      </div>
      <a
        className={classes.anchor}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://ropsten.etherscan.io/block/${blockNumber - 1}`}
      >
        #{blockNumber - 1}
      </a>
      </div>
      <div
        id='prevBlock2'
        className={`${classes.box} box`}
      >
        <div>
          {prevBlock2Transactions.map(transaction => (
            <span>X</span>
          ))}
        </div>
        <a
          className={classes.anchor}
          target="_blank"
          rel="noopener noreferrer"
          href={`https://ropsten.etherscan.io/block/${blockNumber - 2}`}
        >
          #{blockNumber - 2}
        </a>
      </div>
    </div>
  </div>
)

export default withStyles(styles)(Sidebar);
