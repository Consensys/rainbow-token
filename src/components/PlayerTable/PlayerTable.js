// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Material Components
import {
  Paper
} from '@material-ui/core';
// Components
import MuiVirtualizedTable from '../UI/MuiVirtualizedTable/MuiVirtualizedTable';
import BlendDialog from '../../containers/Dialogs/BlendDialog';

// Styles
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  paper: {
    position: 'sticky',
    top: '160px',
    width: '70%',
    height: 'calc(100% - 230px)',
    margin: 'auto',
    opacity: '0.99',
    marginBottom: '70px',
  },
  label: {
    fontWeight: 600,
    fontSize: '14px',
  }
})

const PlayerTable = ({ classes, rows, txInProgress, openBlendDialog }) => (
  <Paper className={classes.paper}>
    {rows.map(
      ({ token, address }, index) => (
        <BlendDialog
          key={index}
          blendingToken={token}
          blendingAddress={address}
          index={index}
        />
      )
    )}
    <MuiVirtualizedTable
      className={classes.table}
      rowCount={rows.length}
      rowGetter={({ index }) => rows[index]}
      onRowClick={!txInProgress ? ({ index }) => openBlendDialog(index) : null}
      columns={[
        {
          width: 120,
          flexGrow: 2.0,
          label: <span className={classes.label}>Cool Pseudonym</span>,
          dataKey: 'pseudoDisplay',
        },
        {
          width: 120,
          flexGrow: 1.0,
          label: <span className={classes.label}>Token</span>,
          dataKey: 'tokenIcon',
        },
        {
          width: 120,
          flexGrow: 1.0,
          label: <span className={classes.label}>Price (<i className="fab fa-ethereum" />)</span>,
          dataKey: 'blendingPrice',
          numeric: true,
        },
        {
          width: 120,
          flexGrow: 1.0,
          label: <span className={classes.label}>Score (%)</span>,
          dataKey: 'score',
          numeric: true,
        },
      ]}
    />
  </Paper>
)

PlayerTable.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  openBlendDialog: PropTypes.func.isRequired,
  txInProgress: PropTypes.bool.isRequired,
}

export default withStyles(styles)(PlayerTable)
