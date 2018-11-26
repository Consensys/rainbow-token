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
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'calc(100vh - 100px)',
  },
  box: {
    width: '8vw',
    height: '3vh',
    border: '2px solid rgb(230, 230, 230)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px'
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
      <div id='futur-block' className={`${classes.box} box`}>
        <div className={classes.text}>
          Block #{blockNumber + 1}
        </div>
      </div>
      <div id='current-block' className={`${classes.box} box`}>
        <div className={classes.text}>
          Block #{blockNumber}
        </div>
      </div>
      <div id='prev-block' className={`${classes.box} box`}>
        <div className={classes.text}>
          Block #{blockNumber - 1}
        </div>
      </div>
      <div id='invisible-block' className={`${classes.box} box`}>
      </div>
    </div>
  </div>
)

export default withStyles(styles)(Footer);
