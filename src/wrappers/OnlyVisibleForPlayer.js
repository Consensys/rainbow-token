import React from "react";
import { connect } from "react-redux";

const OnlyVisibleForPlayer = Component => {
    const CurrentPlayer = ({ isPlayer }) => {
        if (isPlayer) {
            return <Component />;
        } else {
            return null;
        }
    };

    const mapStateToProps = state => ({
        isPlayer: state.status.user.isPlayer
    });

    return connect(
        mapStateToProps,
        null
    )(CurrentPlayer);
};

export default OnlyVisibleForPlayer;
