import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    flex: 1,
    overflow: 'hidden',
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
    textDecoration: 'none'
  }
})


const Footer = ({ blockNumber, classes }) => (
  <div id='blockNumberLoader' className={classes.global}>
    <div className={classes.boxes}>
      <div
        id='futurBlock'
        className={`${classes.box} box`}
      >
        #{blockNumber + 1}
      </div>
      <a
        id='currentBlock'
        className={`${classes.box} box`}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://ropsten.etherscan.io/block/${blockNumber}`}
      >
        #{blockNumber}
      </a>
      <a
        id='prevBlock1'
        className={`${classes.box} box`}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://ropsten.etherscan.io/block/${blockNumber - 1}`}
      >
        #{blockNumber - 1}
      </a>
      <a
        id='prevBlock2'
        className={`${classes.box} box`}
        target="_blank"
        rel="noopener noreferrer"
        href={`https://ropsten.etherscan.io/block/${blockNumber - 2}`}
      >
        #{blockNumber - 2}
      </a>
    </div>
  </div>
)

export default withStyles(styles)(Footer);
