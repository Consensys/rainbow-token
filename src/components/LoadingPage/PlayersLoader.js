import React from 'react';

const PlayersLoader = ({ playersLoading }) => (
  <div>
    { playersLoading && (
      <h1>Players loading...</h1>
    )}
  </div>
)

export default PlayersLoader;
