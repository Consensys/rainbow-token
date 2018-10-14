import React from 'react';

/* Components */
import ConsenSysElement from './ConsenSysElement';

/* Containers */
import WelcomeTitle from '../../containers/UserHeader/WelcomeTitle';
import TargetToken from '../../containers/UserHeader/TargetToken';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    marginTop: '1em',
    marginBottom: '1em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

const TopHeader = ({ classes }) => (
  <div className={classes.global}>
    <WelcomeTitle />
    <TargetToken />
    <ConsenSysElement />
  </div>
)

export default withStyles(styles)(TopHeader);
