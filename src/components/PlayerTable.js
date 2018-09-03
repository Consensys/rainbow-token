import React from 'react';

import PlayerCell from './PlayerCell';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const PlayerTable = ({ players, inProgress, onBlendWithOthers }) => {
  const dashboard = players.map(player => (
    <PlayerCell
      key={player.address}
      player={player}
      inProgress={inProgress}
      onBlendWithOthers={onBlendWithOthers}
    />
  ));
  return (
    <Paper style={{width: '80%', margin: '3em auto'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
                Cool pseudonym
            </TableCell>
            <TableCell>
              Current coin
            </TableCell>
            <TableCell>
              Score
            </TableCell>
            <TableCell>
              Interact
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dashboard}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default PlayerTable;
