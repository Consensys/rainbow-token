import React from 'react';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  text: {
    fontSize: '1.2em',
    color: 'rgb(230, 230, 230)',
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
  <React.Fragment>
    <div id='blockNumberLoader' className={classes.global}>
      <hr className={classes.hr} />
      <div className={classes.text}>
        #Block: {blockNumber}<span>.</span><span>.</span><span>.</span>
      </div>
    </div>
  </React.Fragment >
)

export default withStyles(styles)(Footer);
