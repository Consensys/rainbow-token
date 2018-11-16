import React from 'react';

/* Redux */
import { connect } from 'react-redux';
import { openBlendDialog } from '../../redux/actions/ui';

/* Component */
import PlayerCell from '../../components/PlayerTable/PlayerCell';

const PlayerCells = ({
  address,
  players,
  inProgress,
  onClick
}) => {
  // Delete the key address of players
  const filteredPlayers = { ...players };
  delete filteredPlayers[address];
  // Form the cells
  const playerCells = Object.values(filteredPlayers).map(
    (player, index) => (
      <PlayerCell
        key={player.address}
        player={player}
        inProgress={inProgress}
        index={index}
        onClick={onClick}
      />
    )
  );

  return (
    <React.Fragment>
      {playerCells}
    </React.Fragment>
  )
}

const mapStateToProps = state => ({
  address: state.web3.account.address,
  players: state.data.players,
  inProgress: !!state.web3.transactions.txHash
})

const mapDispatchToProps = {
  onClick: () => openBlendDialog()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerCells)
