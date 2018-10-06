import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import { setUpWeb3 } from '../redux/actions/web3';

/* Components */
import Loader from '../components/Loader/Loader';

class Web3Handler extends Component {
  componentDidMount() {
    const { setUpWeb3 } = this.props;
    setUpWeb3();

  }
  render() {
    const { children, isLoading } = this.props;
    if (!isLoading) {
      return (
        <div id='Web3Handler'>
          {children}
        </div>
      )
    } else {
      return (
        <Loader inProgress={true} />
      )
    }
  }
}

const mapStateToProps = state => ({
  isLoading: state.web3.isLoading
})

const mapDispatchToProps = {
  setUpWeb3
}

export default connect(mapStateToProps, mapDispatchToProps)(Web3Handler);
