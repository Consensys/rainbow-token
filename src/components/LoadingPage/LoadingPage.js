import React from 'react';

/* Containers */
import PlayersLoader from '../../containers/LoadingPage/PlayersLoader';

/* Components */
import LoaderItem from '../UI/LoaderItem/LoaderItem'

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  global: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Loader = ({ classes }) => (
  <div className={classes.global}>
    <LoaderItem inProgress={true} />
    <PlayersLoader />
  </div>
)

export default withStyles(styles)(Loader);
