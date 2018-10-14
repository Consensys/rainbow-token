import React from 'react';

/* Containers */
import LauncherRulesDialog from '../../containers/UserHeader/LauncherRulesDialog';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    fontSize: '1.3em',
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    marginRight: '1em'
  }
})

const ConsenSysElement = ({ classes }) => (
  <div className={classes.global}>
    <div className={classes.text}>
      Reach the blue<br/> <strong>Consensys</strong> Token
    </div>
    <LauncherRulesDialog />
  </div>
)

export default withStyles(styles)(ConsenSysElement);
