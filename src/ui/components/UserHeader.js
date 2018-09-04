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
          Default Token Color: RGB({user.defaultColor.r}, {user.defaultColor.g}, {user.defaultColor.b})
        </span>
        <span style={{ display:'inline-block', marginLeft: '1em', width: '20px', height: '20px', background: `rgb(${user.defaultColor.r}, ${user.defaultColor.g}, ${user.defaultColor.b})`, borderRadius:'50%', boxShadow: '.3px .3px black' }}>
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection:'row', fontSize: '1.2em'}}>
        <span>Current Token Color: RGB({user.color.r}, {user.color.g}, {user.color.b})</span>
        <span style={{ display:'inline-block', marginLeft: '1em', width: '20px', height: '20px', background: `rgb(${user.color.r}, ${user.color.g}, ${user.color.b})`, borderRadius:'50%', boxShadow: '.3px .3px black' }}></span>
      </div>
      <Button variant='contained' color='primary' onClick={e => onBlendWithSelf(e)} disabled={inProgress}>
        Blend with yourself
      </Button>
    </div>
  </div>
)

export default UserHeader;
