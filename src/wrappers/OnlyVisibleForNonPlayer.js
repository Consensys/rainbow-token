import React from 'react';
import { connect } from 'react-redux';

const OnlyVisibleForNonPlayer = Component => {
  const NonCurrentPlayer = ({ currentPlayer }) => {
    console.log('YO', currentPlayer);
    if (!currentPlayer) {
      return (
        <Component />
      )
    } else {
      return null;
    }
  }

  const mapStateToProps = state => ({
    currentPlayer: state.players.data[state.user.data.address] || false
  })

  return connect(mapStateToProps, null)(NonCurrentPlayer);
}

export default OnlyVisibleForNonPlayer;
