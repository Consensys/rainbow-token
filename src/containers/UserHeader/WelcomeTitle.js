import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import {
  subscribeToAccount,
  unsubscribeToAccount
} from '../../redux/actions/setUp/web3';

/* Component */
import WelcomeTitle from '../../components/UserHeader/WelcomeTitle';

class container extends Component {
  componentDidMount() {
    const { subscribeToAccount } = this.props;
    subscribeToAccount();
  }

  componentWillUnmount() {
    const { unsubscribeToAccount } = this.props;
    unsubscribeToAccount();
  }

  render() {
    const { address, pseudo, balance } = this.props;
    return (
      <WelcomeTitle
        address={address}
        pseudo={pseudo}
        balance={balance}
      />
    )
  }
}

const mapStateToProps = state => ({
  address: state.web3.account.address,
  pseudo: state.data.players[state.web3.account.address].pseudo,
  balance: state.web3.account.balance
})

const mapDispatchToProps = {
  subscribeToAccount,
  unsubscribeToAccount
}

export default connect(mapStateToProps, mapDispatchToProps)(container);
