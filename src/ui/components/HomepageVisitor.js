import React from 'react';

import Button from '@material-ui/core/Button';
import Loader from './Loader';

const HomepageVisitor = ({ 
  inProgress, 
  startPlaying 
}) => {
  const loader = inProgress ? <Loader /> : '';

  return (
    <div style={{ width: '60%', margin: 'auto', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginTop: '10%' }}>
        <h2 style={{ fontSize: '2em' }}> Welcome to the Wonderful World of Rainbow Tokens</h2>
      </div>
      <div style={{ margin: '4em' }}>
        <Button variant='contained' color='primary' onClick={e => {e.preventDefault(); startPlaying();}} disabled={inProgress}>
          Start playing
        </Button>
      </div>
      { loader }
    </div>
  )
}

export default HomepageVisitor;
