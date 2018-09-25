import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    textShadow: '1px 1px 4px rgba(10, 10, 10, 0.5)'
  },
  element: {
    marginBottom: '1em'
  },
  anchorTag: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
})

const Web3Error = ({ classes }) => (
  <div className={classes.global}>
    <div className={classes.element}>
      You will need the <a className={classes.anchorTag} href='https://metamask.io/'>Metamask extension</a> to play this game
    </div>
    <div className={classes.element}>
      Once connected to Metamask, connect to the Ropsten test network
    </div>
    <div>
      Use the <a className={classes.anchorTag} href='https://faucet.metamask.io/'>Ropsten Faucet</a> to ask for one Ether
    </div>
  </div>
)

export default withStyles(styles)(Web3Error);
