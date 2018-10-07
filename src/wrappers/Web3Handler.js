import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import { setUpWeb3 } from '../redux/actions/web3';

class Web3Handler extends Component {
  componentDidMount() {
    const { setUpWeb3 } = this.props;
    setUpWeb3();

  }
  render() {
    const { children } = this.props;
    return (
      <div id='Web3Handler'>
        {children}
      </div>
    )
  }
}

const mapDispatchToProps = {
  setUpWeb3
}

export default connect(null, mapDispatchToProps)(Web3Handler);
