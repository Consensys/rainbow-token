// Libs
import React from "react";
import PropTypes from 'prop-types';
/* Components */
import LoaderItem from "../UI/LoaderItem/LoaderItem";
import PlayersLoader from './PlayersLoader';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    global: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
});

const Loader = ({ classes, isPlayersLoading }) => (
    <div className={classes.global}>
        <LoaderItem inProgress={true} />
        <PlayersLoader isPlayersLoading={isPlayersLoading} />
    </div>
);

Loader.propTypes = {
  classes: PropTypes.object.isRequired,
  isPlayersLoading: PropTypes.bool.isRequired,
}

export default withStyles(styles)(Loader);
