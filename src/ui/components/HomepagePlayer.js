import React from 'react';

import UserHeader from './UserHeader';
import PlayerTable from './PlayerTable';

const HomepagePlayer = ({
  user,
  players,
  inProgress,
  onBlendWithSelf,
  onBlendWithOthers
}) => (
  <div>
    <UserHeader
      user={user}
      inProgress={inProgress}
      onBlendWithSelf={onBlendWithSelf}
    />
    <PlayerTable
      players={players}
      inProgress={inProgress}
      onBlendWithOthers={onBlendWithOthers}
    />
  </div>
)

export default HomepagePlayer;
