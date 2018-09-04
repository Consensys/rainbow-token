import React from 'react';
import Web3 from 'web3';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

const PlayerCell = ({ 
  player, 
  inProgress, 
  blend 
}) => (
  <TableRow key={player.pseudo}>
    <TableCell>
      {player.pseudo}
    </TableCell>
    <TableCell style={{}}>
      <div style={{ display: 'flex', flexDirection:'row'}}>
        <span>RGB({player.token.color.r}, {player.token.color.g}, {player.token.color.b})</span>
        <span style={{ display:'inline-block', marginLeft: '1em', width: '15px', background: `rgb(${player.token.color.r}, ${player.token.color.g}, ${player.token.color.b})`, borderRadius:'50%' }}></span>
      </div>
    </TableCell>
    <TableCell>
      { player.score }
    </TableCell>
    <TableCell>
      <Button
        variant='contained'
        color='primary'
        disabled={inProgress}
        onClick={e => {e.preventDefault(); blend(player.address, player.token);}}
      >
        { Web3.utils.fromWei(player.token.blendingPrice, 'ether') } ETH
      </Button>
    </TableCell>
  </TableRow>
)

export default PlayerCell;
