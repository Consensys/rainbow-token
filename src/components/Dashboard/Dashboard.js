import React from 'react';

/* Components */
import UserHeader from '../UserHeader/UserHeader';

/* Containers */
import RulesDialog from '../../containers/Dialogs/RulesDialog';
import DefaultBlendDialog from '../../containers/Dialogs/DefaultBlendDialog';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hr: {
    margin: '20px',
  	border: 'none',
  	height: '2px',
    background: 'linear-gradient(-45deg, #ff0000 0%,#ffff00 25%,#00ff00 50%,#00ffff 75%,#0000ff 100%)'
  }
})

const Dashboard = ({ classes }) => (
  <div className={classes.global}>
    <RulesDialog />
    <DefaultBlendDialog />
    <UserHeader />
    <hr className={classes.hr} />
  </div>
)

export default withStyles(styles)(Dashboard);
