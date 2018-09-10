import React from 'react';

import Button from '@material-ui/core/Button';
import Loader from './Loader';

import rainbowToken from '../../static/svg/RainbowTokenWorkshop.svg';

import { homepageVisitorStyle } from '../styles'


const HomepageVisitor = ({
    inProgress,
    startPlaying,
}) => (
    <div style={homepageVisitorStyle.global}>
      <div style={homepageVisitorStyle.sidePanel}>
        <img
          style={homepageVisitorStyle.imgSidePanel}
          src={rainbowToken}
          alt='rainbowBackground'
        />
      </div>
      <div style={homepageVisitorStyle.mainPanel}>
        <h1 style={homepageVisitorStyle.title} className='text-pop-up-top'>
          Welcome to the <br /> Rainbow Token Amazing Game
        </h1>
        <Button
          style={homepageVisitorStyle.btn}
          variant='contained'
          color='primary'
          onClick={e => { e.preventDefault(); startPlaying(); }}
          disabled={inProgress}
        >
          Start playing
        </Button>
        <Loader inProgress={inProgress} />
        <div style={homepageVisitorStyle.footer}>
          <div style={homepageVisitorStyle.footerElement}>
            You will need the <a style={homepageVisitorStyle.anchorTag} href='https://metamask.io/'>Metamask extension</a> to play this game
          </div>
          <div style={homepageVisitorStyle.footerElement}>
            Once connected to Metamask, connect to the Ropsten test network
          </div>
          <div>
            Use the <a style={homepageVisitorStyle.anchorTag} href='https://faucet.metamask.io/'>Ropsten Faucet</a> to ask for one Ether
          </div>
        </div>
      </div>
      <div style={{ ...homepageVisitorStyle.sidePanel, transform: 'scaleX(-1)' }}>
        <img
          style={homepageVisitorStyle.imgSidePanel}
          src={rainbowToken}
          alt='rainbowBackground'
        />
      </div>
    </div>
);

export default HomepageVisitor;
