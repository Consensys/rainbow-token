import React from 'react';

import PlayerCell from './PlayerCell';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { playerTableStyle } from '../styles';

const PlayerTable = ({
    currentPlayer,
    players,
    inProgress,
    blend }) => {
    const dashboard = Object.values(players).map((player, index) => (
        <PlayerCell
            key={player.address}
            currentPlayer={currentPlayer}
            player={player}
            inProgress={inProgress}
            blend={blend}
            index={index}
        />
    ));

    return (
      <Paper style={playerTableStyle.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={playerTableStyle.cell}>
                Cool pseudonym
              </TableCell>
              <TableCell style={playerTableStyle.cell}>
                Current token
              </TableCell>
              <TableCell style={playerTableStyle.cell}>
                Price ( Ξ )
              </TableCell>
              <TableCell style={playerTableStyle.cell}>
                Matching ( % )
              </TableCell>
              <TableCell style={playerTableStyle.cell}>
                Blend
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {dashboard}
          </TableBody>
        </Table>
      </Paper>
    );
};


export default PlayerTable;
