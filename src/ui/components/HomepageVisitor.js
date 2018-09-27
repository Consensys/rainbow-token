import React from 'react';

/* Components */
import Button from '@material-ui/core/Button';
import Loader from './Loader';

/* Images */
import rainbowToken from '../../static/svg/RainbowTokenWorkshop.svg';

/* Styles */
import { homepageVisitorStyle } from '../styles'
import { withStyles } from "@material-ui/core/styles";


const HomepageVisitor = ({
    onRopsten,
    connectedToMetamask,
    inProgress,
    startPlaying,
    classes
}) => (
    <div className={classes.global}>
      <div className={classes.rightPanel}>
        <img
          className={classes.imgSidePanel}
          src={rainbowToken}
          alt='rainbowBackground'
        />
      </div>
      <div className={classes.mainPanel}>
        <h1 className={classes.title}>
          Welcome to the <br /> colourful world of Rainbow Tokens
        </h1>
        {onRopsten && connectedToMetamask && (
          <Button
            className={classes.btn}
            variant='contained'
            color='primary'
            onClick={e => { e.preventDefault(); startPlaying(); }}
            disabled={inProgress !== undefined}
          >
            Start playing
          </Button>
        )}
        <Loader inProgress={inProgress} />
        <div className={classes.footer}>
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
      </div>
      <div className={classes.leftPanel}>
        <img
          className={classes.imgSidePanel}
          src={rainbowToken}
          alt='rainbowBackground'
        />
      </div>
    </div>
);

export default withStyles(homepageVisitorStyle)(HomepageVisitor);
