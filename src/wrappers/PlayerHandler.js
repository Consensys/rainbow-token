import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import { getUserStatus } from '../redux/actions/user';

class PlayerHandler extends Component {
  componentDidMount() {
    const { getUserStatus } = this.props;
    getUserStatus();

  }
  render() {
    const { children, contracts } = this.props;
    console.log('CONTRACTS', contracts)
    return (
      <div id='PlayerHandler'>
        {children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  contracts: state.web3.contracts.methods
})

const mapDispatchToProps = {
  getUserStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerHandler);
