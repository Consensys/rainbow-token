import React from 'react';

/* Containers */
import DefaultBlendSpace from '../../containers/UserHeader/DefaultBlendSpace';
import UserSpace from '../../containers/UserHeader/UserSpace';
import PriceSelector from '../../containers/UserHeader/PriceSelector';

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
