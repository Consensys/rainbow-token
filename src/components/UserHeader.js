import React from 'react';

import Button from '@material-ui/core/Button';

const UserHeader = ({ user, inProgress, onBlendWithSelf }) => (
  <div style={{ margin: 'auto', width: '90%' }}>
    <div style={{ marginTop: '2em', marginBottom: '4em', display: 'flex', justifyContent: 'space-around' }}>
      <span style={{ fontSize: '1.3em' }}>Welcome <strong>{user.pseudo}</strong></span>
      <span>address: {user.address.substring(0,10)}...</span>
    </div>
    <div style={{ display:'flex', flexDirection:'row', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', flexDirection:'row'}}>
        <span>
          Default Coin: RGB({user.rgbDefault[0]}, {user.rgbDefault[1]}, {user.rgbDefault[2]})
        </span>
        <span style={{ display:'inline-block', marginLeft: '1em', width: '20px', height: '20px', background: `rgb(${user.rgbDefault[0]}, ${user.rgbDefault[1]}, ${user.rgbDefault[2]})`, borderRadius:'50%', boxShadow: '.3px .3px black' }}>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection:'row', fontSize: '1.2em'}}>
        <span>Current Coin: RGB({user.rgbCurrent[0]}, {user.rgbCurrent[1]}, {user.rgbCurrent[2]})</span>
        <span style={{ display:'inline-block', marginLeft: '1em', width: '20px', height: '20px', background: `rgb(${user.rgbCurrent[0]}, ${user.rgbCurrent[1]}, ${user.rgbCurrent[2]})`, borderRadius:'50%', boxShadow: '.3px .3px black' }}></span>
      </div>
      <Button variant='contained' color='primary' onClick={e => onBlendWithSelf(e)} disabled={inProgress}>
        Blend with yourself
      </Button>
    </div>
  </div>
)

export default UserHeader;
