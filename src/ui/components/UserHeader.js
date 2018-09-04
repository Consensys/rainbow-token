import React from 'react';

import Button from '@material-ui/core/Button';

const UserHeader = ({ 
  currentPlayer, 
  inProgress, 
  blend 
}) => (
  <div style={{ margin: 'auto', width: '90%' }}>
    <div style={{ marginTop: '2em', marginBottom: '4em', display: 'flex', justifyContent: 'space-around' }}>
      <span style={{ fontSize: '1.3em' }}>Welcome <strong>{currentPlayer.pseudo}</strong></span>
      <span>address: {currentPlayer.address.substring(0,10)}...</span>
    </div>
    <div style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection:'row'}}>
        <span>
          Default Color: RGB({currentPlayer.token.defaultColor.r}, {currentPlayer.token.defaultColor.g}, {currentPlayer.token.defaultColor.b})
        </span>
        <span style={{ display:'inline-block', marginLeft: '1em', width: '20px', height: '20px', background: `rgb(${currentPlayer.token.defaultColor.r}, ${currentPlayer.token.defaultColor.g}, ${currentPlayer.token.defaultColor.b})`, borderRadius:'50%', boxShadow: '.3px .3px black' }}>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection:'row', fontSize: '1.2em'}}>
        <span>Current Token Color: RGB({currentPlayer.color.r}, {currentPlayer.color.g}, {currentPlayer.color.b})</span>
        <span style={{ display:'inline-block', marginLeft: '1em', width: '20px', height: '20px', background: `rgb(${currentPlayer.token.color.r}, ${currentPlayer.token.color.g}, ${currentPlayer.token.color.b})`, borderRadius:'50%', boxShadow: '.3px .3px black' }}></span>
      </div>
      <Button variant='contained' color='primary' onClick={e => {e.preventDefault(); blend();}} disabled={inProgress}>
        Blend with your default Color
      </Button>
    </div>
  </div>
)

export default UserHeader;
