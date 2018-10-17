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
  footerElement: {
    marginBottom: '1em'
  },
  anchorTag: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  },
})

const Footer = ({ classes }) => (
  <div className={classes.global}>
    <div className={classes.footerElement}>
      To play you need having <a className={classes.anchorTag} href='https://metamask.io/'>Metamask extension</a> installed.
    </div>
    <div className={classes.footerElement}>
      Once MetaMask downloaded and open, please connect to Ropsten test network
    </div>
    <div>
      If you need ETH you can get some from MetaMask's <a className={classes.anchorTag} href='https://faucet.metamask.io/'>Ropsten Faucet</a>
    </div>
  </div>
)

export default withStyles(styles)(Footer);
