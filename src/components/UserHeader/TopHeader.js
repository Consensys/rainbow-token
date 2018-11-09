import React from 'react';

/* Components */
import ConsenSysToken from './../UI/Token/Token';

/* Containers */
import WelcomeTitle from '../../containers/UserHeader/WelcomeTitle';
import ConsenSysElement from '../../containers/UserHeader/ConsenSysElement';

/* Constants */
import { targetColor } from '../../constants/rainbowToken';

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
    <ConsenSysToken
      color={targetColor}
      size='60'
      boxShadowSize='1.6'
      borderSize='1.2'
    />
    <ConsenSysElement />
  </div>
)

export default withStyles(styles)(TopHeader);
