// Libs
import React from "react";
import PropTypes from 'prop-types';

const PlayersLoader = ({ isPlayersLoading }) => (
    <div>
        {isPlayersLoading && (
            <h1>Please wait, the players are being loaded...</h1>
        )}
    </div>
);

PlayersLoader.propTypes = {
  isPlayersLoading: PropTypes.bool.isRequired,
}

export default PlayersLoader;
