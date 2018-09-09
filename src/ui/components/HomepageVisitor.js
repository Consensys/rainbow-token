import React from 'react';

import Button from '@material-ui/core/Button';
import Loader from './Loader';

import Consensys_storm from '../../static/svg/ConsenSys_storm.svg';
import rainbowToken from '../../static/svg/RainbowTokenWorkshop.svg';

const homepageVisitorStyle = {
    all: {
        display: 'flex',
        flexDirection: 'row',
        color: 'white',
        textShadow: '1.5px 1.5px 2px rgb(10, 10, 10)',
    },
    anchorTag: {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

const HomepageVisitor = ({
    inProgress,
    startPlaying,
}) => (
    <div style={homepageVisitorStyle.all}>
        <div style={{ flexBasis: '20%', backgroundImage: `url(${rainbowToken})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: '500px 500px', zIndex: 2 }}></div>
        <div style={{ flexBasis: '60%', margin: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ marginTop: '3em' }}>
                <h1 style={{ fontSize: '2em', textTransform: 'uppercase' }} className='text-pop-up-top'>
          Welcome to the <br /> Rainbow Token Amazing Game
                </h1>
            </div>
            <div style={{ marginTop: '1.5em' }}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={e => { e.preventDefault(); startPlaying(); }}
                    disabled={inProgress}
                >
          Start playing
                </Button>
            </div>
            <Loader inProgress={inProgress} />
            <div style={{ marginTop: '-1.5em' }}>
                <div style={{ marginBottom: '1em' }}>
          You will need the <a style={homepageVisitorStyle.anchorTag} href='https://metamask.io/'>Metamask extension</a> to play this game
                </div>
                <div style={{ marginBottom: '1em' }}>
          Once connected to Metamask, connect to the Ropsten test network
                </div>
                <div style={{ marginBottom: '.5em' }}>
          Use the <a style={homepageVisitorStyle.anchorTag} href='https://faucet.metamask.io/'>Ropsten Faucet</a> to ask for one Ether
                </div>
            </div>
        </div>
        <div style={{ flexBasis: '20%', backgroundImage: `url(${rainbowToken})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: '500px 500px', transform: 'scaleX(-1)', zIndex: 2 }}></div>
    </div>
);

export default HomepageVisitor;
