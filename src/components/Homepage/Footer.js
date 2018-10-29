import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: '-1.5em',
    marginBottom: '1em'
  },
  anchorTag: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
})

const Footer = ({
  classes,
  metamaskUnlocked,
  onAvailableNetwork
}) => (
  <div className={classes.global}>
    {!metamaskUnlocked && (
      <div>
        <h4>Please unlock your Metamask.</h4>
        <span>Never heard of Metamask?  </span>
        <a className={classes.anchorTag} href='https://metamask.io/'>
          Go take a look!
        </a>
      </div>
    )}
    { metamaskUnlocked && !onAvailableNetwork && (
      <div>
        <h4>Please, connect to the Ropsten network!</h4>
      </div>
    )}
    { metamaskUnlocked && onAvailableNetwork && (
      <div>
        PS: If you need ETH you can get some from MetaMask's <a className={classes.anchorTag} href='https://faucet.metamask.io/'>Ropsten Faucet</a>
      </div>
    )}
  </div>
)

export default withStyles(styles)(Footer);
