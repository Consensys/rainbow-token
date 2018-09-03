import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

const PlayerCell = ({ player, inProgress, onBlendWithOthers }) => (
  <TableRow key={player.pseudo}>
    <TableCell>
      {player.pseudo}
    </TableCell>
    <TableCell style={{}}>
      <div style={{ display: 'flex', flexDirection:'row'}}>
        <span>RGB({player.rgbCurrent[0]}, {player.rgbCurrent[1]}, {player.rgbCurrent[2]})</span>
        <span style={{ display:'inline-block', marginLeft: '1em', width: '15px', background: `rgb(${player.rgbCurrent[0]}, ${player.rgbCurrent[1]}, ${player.rgbCurrent[2]})`, borderRadius:'50%' }}></span>
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
        onClick={e => onBlendWithOthers(e, player.address, player.rgbCurrent[0], player.rgbCurrent[1], player.rgbCurrent[2])}
      >
        Blend
      </Button>
    </TableCell>
  </TableRow>
)

export default PlayerCell;
