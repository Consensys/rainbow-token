import React from 'react';

/* Containers */
import TransactionLoader from '../../containers/Sidebar/TransactionLoader';

/* Components */
import Block from './Block';

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
  comingTransactions,
  prevBlock0Transactions,
  prevBlock1Transactions,
  prevBlock2Transactions,
  classes
}) => (
  <div id='blockNumberLoader' className={classes.global}>
    <TransactionLoader />
    <div className={classes.boxes}>
      <Block
        id='futurBlock'
        transactions={comingTransactions}
        blockNumber={blockNumber+1}
      />
      <Block
        id='prevBlock0'
        blockNumber={blockNumber}
        transactions={prevBlock0Transactions}
      />
      <Block
        id='prevBlock1'
        blockNumber={blockNumber-1}
        transactions={prevBlock1Transactions}
      />
      <Block
        id='prevBlock2'
        blockNumber={blockNumber-2}
        transactions={prevBlock2Transactions}
      />
    </div>
  </div>
)

export default withStyles(styles)(Sidebar);
