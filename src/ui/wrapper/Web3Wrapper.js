import React, { Component } from 'react';

/* Components */
import Loader from '../components/Loader';
import Web3Error from '../components/Web3Error';

class Web3Wrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onRopsten: false,
      isLoading: true
    }
  }

  componentDidMount() {
    window.web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "3":
          this.setState({ onRopsten: true, isLoading: false });
          break
        default:
          this.setState({ onRopsten: false, isLoading: false });
        }
      });
  }

  render() {
    const { onRopsten, isLoading } = this.state;

    if (isLoading) {
      return <Loader />;
    }

    if (onRopsten) {
      return this.props.children;
    }

    return <Web3Error />;
  }
}

export default Web3Wrapper;
