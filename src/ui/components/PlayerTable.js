import React from 'react';

/* Component */
import PlayerCell from './PlayerCell';

/* Material ui components */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

/* Styles */
import { withStyles } from "@material-ui/core/styles";
import { playerTableStyle } from '../styles';

const PlayerTable = ({
    currentPlayer,
    players,
    inProgress,
    blend,
    classes
  }) => {
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
      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>
                Cool pseudonym
              </TableCell>
              <TableCell className={classes.cell}>
                Current token
              </TableCell>
              <TableCell className={classes.cell}>
                Price ( Ξ )
              </TableCell>
              <TableCell className={classes.cell}>
                Matching ( % )
              </TableCell>
              <TableCell className={classes.cell}>
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


export default withStyles(playerTableStyle)(PlayerTable);
