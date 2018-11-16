import React from 'react';

/* Components */
import TopHeader from './TopHeader';
import BottomHeader from './BottomHeader';


/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    color: 'white',
    textShadow: '0px 0px 4px rgb(10, 10, 10)',
    width: '100%',
    flex: 1,
  },
  hr: {
    margin: '10px',
  	border: 'none',
  	height: '2px',
    background: 'linear-gradient(-45deg, #ff0000 0%,#ffff00 25%,#00ff00 50%,#00ffff 75%,#0000ff 100%)'
  }
})

const UserHeader = ({ classes }) => (
  <div className={classes.global}>
    <TopHeader />
    <hr className={classes.hr} />
    <BottomHeader />
  </div>
)

export default withStyles(styles)(UserHeader);
