import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import { openBlendDialog } from '../../redux/actions/ui';

/* Component */
import PlayerTable from '../../components/PlayerTable/PlayerTable';

class PlayerTableContainer extends Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const {
      address,
      players,
      inProgress,
      onClick,
    } = this.props;
    const {
      page,
      rowsPerPage
    } = this.state;

    // Delete the key address of players
    const filteredPlayers = { ...players };
    delete filteredPlayers[address];
    // Form the cells
    const rows = Object.values(filteredPlayers);

    return (
      <PlayerTable
        rows={rows}
        inProgress={inProgress}
        onClick={onClick}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={this.handleChangePage}
        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    )
  }
}

const mapStateToProps = state => ({
  address: state.web3.account.address,
  players: state.data.players,
  inProgress: !!state.web3.transactions.txHash
})

const mapDispatchToProps = {
  onClick: () => openBlendDialog()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerTableContainer)
