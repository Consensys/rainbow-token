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
    width: '6vw',
    height: '10vh',
    border: '2px solid rgb(230, 230, 230)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    color: 'rgb(230, 230, 230)',
    fontSize: '1.2em',
    textShadow: '.5px .5px 2px rgba(10, 10, 10, 0.6)',
  },
  text: {
    color: 'rgb(230, 230, 230)',
    fontSize: '1.2em',
    textShadow: '.5px .5px 2px rgba(10, 10, 10, 0.6)',
  }
})


const Footer = ({ blockNumber, classes }) => (
  <div id='blockNumberLoader' className={classes.global}>
    <div className={classes.boxes}>
      <div id='futurBlock' className={`${classes.box} box`}>
        #{blockNumber + 1}
      </div>
      <div id='currentBlock' className={`${classes.box} box`}>
        #{blockNumber}
      </div>
      <div id='prevBlock1' className={`${classes.box} box`}>
        #{blockNumber - 1}
      </div>
      <div id='prevBlock2' className={`${classes.box} box`}>
        #{blockNumber - 2}
      </div>
    </div>
  </div>
)

export default withStyles(styles)(Footer);
