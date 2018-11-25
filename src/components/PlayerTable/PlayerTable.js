import React, { Component } from 'react';

/* Containers */
// import PlayerCells from '../../containers/PlayerTable/PlayerCells';

/* Component */
import PlayerCell from './PlayerCell';
import TablePaginationActionsWrapped from './TablePaginationsActions';

/* Styles */
import { withStyles } from "@material-ui/core/styles";

/* Material ui components */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

const styles = theme => ({
  global: {
    minHeight: '300px',
    flex: 6,
    marginBottom: '1em',
    overflow: 'auto'
  },
  root: {
    opacity: 0.95,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 1,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  cell: {
    fontSize: '0.95em'
  },
});

class PlayerTable extends Component {

  render() {
    const {
      rows,
      inProgress,
      onClick,
      page,
      rowsPerPage,
      handleChangePage,
      handleChangeRowsPerPage,
      classes
    } = this.props;
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
      <div className={classes.global}>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell className={classes.cell}>
                    Cool pseudonym
                  </TableCell>
                  <TableCell className={classes.cell}>
                    Current token
                  </TableCell>
                  <TableCell className={classes.cell}>
                    Price ( {/*Ξ */}<i className="fab fa-ethereum"></i> )
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
                  (player, index) => (
                    <PlayerCell
                      key={player.address}
                      player={player}
                      inProgress={inProgress}
                      index={index}
                      onClick={onClick}
                    />
                  ))}
                {/*emptyRows > 0 && (
                  <TableRow style={{ height: 40 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )*/}
              </TableBody>
              <TableFooter
                classes={{ root: classes.tableFooter }}
              >
                <TableRow
                  classes={{ footer: classes.tableRowFooter }}
                >
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    colSpan={5}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActionsWrapped}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(PlayerTable);
