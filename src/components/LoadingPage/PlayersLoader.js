import React from 'react';

const PlayersLoader = ({ playersLoading }) => (
  <div>
    { playersLoading && (
      <h1>Please wait, the players are being loaded...</h1>
    )}
  </div>
)

export default PlayersLoader;
