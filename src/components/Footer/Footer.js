import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    flex: 1,
    width: '100%',
    marginBottom: '.8em',
    maxHeight: '100px',
  },
  text: {
    fontSize: '1.2em',
    color: 'rgb(230, 230, 230)',
    textAlign: 'center'
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
    <div className={classes.text}>
      #Block: {blockNumber}<span>.</span><span>.</span><span>.</span>
    </div>
  </div>
)

export default withStyles(styles)(Footer);
