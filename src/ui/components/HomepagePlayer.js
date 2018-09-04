import React from 'react';

import UserHeader from './UserHeader';
import PlayerTable from './PlayerTable';

const HomepagePlayer = ({
  players,
  currentPlayer,
  inProgress,
  blend
}) => (
  <div>
    <UserHeader
      currentPlayer={currentPlayer}
      inProgress={inProgress}
      blend={blend}
    />
    <PlayerTable
      players={players}
      inProgress={inProgress}
      blend={blend}
    />
  </div>
)

export default HomepagePlayer;
