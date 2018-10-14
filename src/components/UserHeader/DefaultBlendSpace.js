import React from 'react';

/* Containers */
import DefaultColorToken from '../../containers/UserHeader/DefaultColorToken';
import LauncherDefaultBlendDialog from '../../containers/UserHeader/LauncherDefaultBlendDialog';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginBottom: '1em',
    fontSize: '1.2em'
  }
})

const DefaultBlendSpace = ({ classes }) => (
  <div className={classes.global}>
    <div className={classes.title}>
      Your Default Color
    </div>
    <DefaultColorToken />
    <LauncherDefaultBlendDialog />
  </div>
)

export default withStyles(styles)(DefaultBlendSpace);
