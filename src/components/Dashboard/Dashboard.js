import React from 'react';

/* Components */
// import UserHeader from '../UserHeader/UserHeader';
// import PlayerTable from '../PlayerTable/PlayerTable';
import Topbar from '../Topbar/Topbar';

/* Containers */
import RulesDialog from '../../containers/Dialogs/RulesDialog';
import DefaultBlendDialog from '../../containers/Dialogs/DefaultBlendDialog';
import PriceDialog from '../../containers/Dialogs/PriceDialog';
// import Footer from '../../containers/Footer/Footer';
import Sidebar from '../../containers/Sidebar/Sidebar';
import PlayerTable from '../../containers/PlayerTable/PlayerTable';


/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    height: '100vh',
    width: '100%',
    zIndex: 2,
  },
  hr: {
    width: '95%',
    marginTop: '10px',
    marginBottom: '15px',
  	border: 'none',
  	height: '2px',
    background: 'linear-gradient(-45deg, #ff0000 0%,#ffff00 25%,#00ff00 50%,#00ffff 75%,#0000ff 100%)'
  },
  content: {
    width: '100%',
    height: 'calc(100vh - 100px)',
    display: 'flex',
    flexDirection: 'row',
  }
})

const Dashboard = ({ classes }) => (
  <div className={classes.global}>
    <Topbar />
    <div className={classes.content}>
      <Sidebar />
      <PlayerTable />
    </div>
    {/*<Footer />*/}
    <RulesDialog />
    <DefaultBlendDialog />
    <PriceDialog />
  </div>
)

export default withStyles(styles)(Dashboard);
