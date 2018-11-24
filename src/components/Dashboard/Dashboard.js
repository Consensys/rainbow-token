import React from 'react';

/* Components */
import UserHeader from '../UserHeader/UserHeader';
// import PlayerTable from '../PlayerTable/PlayerTable';

/* Containers */
import RulesDialog from '../../containers/Dialogs/RulesDialog';
import DefaultBlendDialog from '../../containers/Dialogs/DefaultBlendDialog';
import PriceDialog from '../../containers/Dialogs/PriceDialog';
import Footer from '../../containers/Footer/Footer';
import PlayerTable from '../../containers/PlayerTable/PlayerTable';


/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hr: {
    width: '95%',
    marginTop: '10px',
    marginBottom: '15px',
  	border: 'none',
  	height: '2px',
    background: 'linear-gradient(-45deg, #ff0000 0%,#ffff00 25%,#00ff00 50%,#00ffff 75%,#0000ff 100%)'
  }
})

const Dashboard = ({ classes }) => (
  <div className={classes.global}>
    <UserHeader />
    <PlayerTable />
    <Footer />
    <RulesDialog />
    <DefaultBlendDialog />
    <PriceDialog />
  </div>
)

export default withStyles(styles)(Dashboard);
