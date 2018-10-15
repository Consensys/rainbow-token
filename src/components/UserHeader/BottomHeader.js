import React from 'react';

/* Components */
import DefaultBlendSpace from './DefaultBlendSpace';
import UserSpace from './UserSpace';
import PriceSelector from './PriceSelector';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    marginTop: '1em',
    marginBottom: '1em',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

const BottomHeader = ({ classes }) => (
  <div className={classes.global}>
    <DefaultBlendSpace />
    <UserSpace />
    <PriceSelector />
  </div>
)

export default withStyles(styles)(BottomHeader);
