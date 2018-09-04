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
      currentPlayer
      inProgress
      blend
    />
    <PlayerTable
      players
      inProgress
      blend
    />
  </div>
)

export default HomepagePlayer;
