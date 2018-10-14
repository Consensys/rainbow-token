import React from 'react';

/* Components */
import HomepageLoader from '../../containers/Homepage/Loader';
import Footer from './Footer';

/* Containers */
import StartPlayingButton from '../../containers/Homepage/StartPlayingButton';

/* Images */
import rainbowToken from '../../static/svg/RainbowTokenWorkshop.svg';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    global: {
      display: 'flex',
      flexDirection: 'row',
      color: 'white',
      textShadow: '1.5px 1.5px 2px rgb(10, 10, 10)',
    },
    anchorTag: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold'
    },
    rightPanel: {
      flex: '1 1 25%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    leftPanel: {
      flex: '1 1 25%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      transform: 'scaleX(-1)'
    },
    imgSidePanel: {
      maxWidth: '100%',
      height: 'auto',
      transform: 'scale(1.5)'
    },
    mainPanel: {
      flex: '2 2 50%',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    title: {
      marginTop: '3em',
      fontSize: '2em',
      textTransform: 'uppercase',
      animation: 'text-pop-up-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
    }
});

const Homepage = ({
    onAvailableNetwork,
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
        <StartPlayingButton />
        <HomepageLoader />
        <Footer />
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

export default withStyles(styles)(Homepage);
