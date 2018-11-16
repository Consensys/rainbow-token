import React from 'react';

/* Containers */
import PlayerCells from '../../containers/PlayerTable/PlayerCells';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

/* Material ui components */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  global: {
    width: '80%',
    flex: 4,
    overflow: 'auto'
  },
  head: {
    position: 'sticky',
    top: '0px'
  },
  cell: {
    fontSize: '1.15em'
  }
})

const PlayerTable = ({ classes }) => (
  <div className={classes.global}>
    <Paper>
      <Table>
        <TableHead className={classes.head}>
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
          <PlayerCells />
        </TableBody>
      </Table>
    </Paper>
  </div>
)

export default withStyles(styles)(PlayerTable);
