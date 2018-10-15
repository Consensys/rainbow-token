import React from 'react';

/* Containers */
import PriceDisplayer from '../../containers/UserHeader/PriceDisplayer';
import LauncherPriceDialog from '../../containers/UserHeader/LauncherPriceDialog';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: '1em'
  }
})

const PriceSelector = ({ classes }) => (
  <div className={classes.global}>
    <div className={classes.title}>
      Your blending price
    </div>
    <PriceDisplayer />
    <LauncherPriceDialog />
  </div>
)

export default withStyles(styles)(PriceSelector);
