import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    flex: 1,
    width: '100%',
    marginBottom: '.8em',
  },
  boxes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  box: {
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '50px',
    border: '2px solid rgb(230, 230, 230)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px'
  },
  text: {
    color: 'rgb(230, 230, 230)',
    fontSize: '1.2em',
    textShadow: '.5px .5px 2px rgba(10, 10, 10, 0.4)',
  },
  hr: {
    width: '95%',
    margin: '20px',
  	border: 'none',
  	height: '2px',
    background: 'linear-gradient(-45deg, #ff0000 0%,#ffff00 25%,#00ff00 50%,#00ffff 75%,#0000ff 100%)'
  }
})

const Footer = ({ blockNumber, classes }) => (
  <div id='blockNumberLoader' className={classes.global}>
    <hr className={classes.hr} />
    <div className={classes.boxes}>
      <div id='invisible-block' className={classes.box}>
      <div className={classes.text}>
        Block #{blockNumber - 2}<span>.</span><span>.</span><span>.</span>
      </div>
      </div>
      <div id='prev-block' className={classes.box}>
        <div className={classes.text}>
          Block #{blockNumber - 1}<span>.</span><span>.</span><span>.</span>
        </div>
      </div>
      <div id='current-block' className={classes.box}>
        <div className={classes.text}>
          Block #{blockNumber}<span>.</span><span>.</span><span>.</span>
        </div>
      </div>
      <div id='futur-block' className={classes.box}>
        <div className={classes.text}>
          Block #{blockNumber + 1}<span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  </div>
)

export default withStyles(styles)(Footer);
