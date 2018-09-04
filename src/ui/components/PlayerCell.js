import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

const PlayerCell = ({ player, inProgress, onBlend }) => (
  <TableRow key={player.pseudo}>
    <TableCell>
      {player.pseudo}
    </TableCell>
    <TableCell style={{}}>
      <div style={{ display: 'flex', flexDirection:'row'}}>
        <span>RGB({player.color.r}, {player.color.g}, {player.color.b})</span>
        <span style={{ display:'inline-block', marginLeft: '1em', width: '15px', background: `rgb(${player.color.r}, ${player.color.g}, ${player.color.b})`, borderRadius:'50%' }}></span>
      </div>
    </TableCell>
    <TableCell>
      {player.score || 400}
    </TableCell>
    <TableCell>
      <Button
        variant='contained'
        color='primary'
        disabled={inProgress}
        onClick={e => onBlend(e, player.address, player.blendingPrice, player.color.r, player.color.g, player.color.b)}
      >
        Blend
      </Button>
    </TableCell>
  </TableRow>
)

export default PlayerCell;
