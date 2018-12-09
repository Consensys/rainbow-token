import React from "react";
import { connect } from "react-redux";

const OnlyVisibleForNonPlayer = Component => {
    const NonCurrentPlayer = ({ isPlayer }) => {
        if (!isPlayer) {
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
    )(NonCurrentPlayer);
};

export default OnlyVisibleForNonPlayer;
