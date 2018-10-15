import React from 'react';

/* Containers */
import UserToken from '../../containers/UserHeader/UserToken';
import UserProgress from '../../containers/UserHeader/UserProgress';

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
    fontSize: '1.3em'
  }
})

const UserSpace = ({ classes }) => (
  <div className={classes.global}>
    <div className={classes.title}>
      Your Token
    </div>
    <UserToken />
    <UserProgress />
  </div>
)

export default withStyles(styles)(UserSpace);
