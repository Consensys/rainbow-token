import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';

/* Component */
import Sidebar from '../../components/Sidebar/Sidebar'

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.blockNumber,
      prevBlock0Transactions: props.prevBlock0Transactions,
      prevBlock1Transactions: props.prevBlock1Transactions,
      prevBlock2Transactions: props.prevBlock2Transactions,
    }
  }

  componentDidUpdate(prevProps) {
    const { blockNumber } = this.props;
    if (prevProps.blockNumber !== blockNumber) {
      const stuff = [ ...document.getElementsByClassName('box') ]
      .map(el => el.classList);
      stuff.forEach(el => el.add('animated'));
      setTimeout(
        () => {
          stuff.forEach(el => el.remove('animated'));
          this.setState((state, props) => ({
            value: blockNumber,
            prevBlock0Transactions: this.props.prevBlock0Transactions,
            prevBlock1Transactions: this.props.prevBlock1Transactions,
            prevBlock2Transactions: this.props.prevBlock2Transactions,
          }))
        }, 1000
      );
    }
  }

  render() {
    const {
      value,
      prevBlock0Transactions,
      prevBlock1Transactions,
      prevBlock2Transactions,
    } = this.state;
    return (
      <Sidebar
        blockNumber={value}
        prevBlock0Transactions={prevBlock0Transactions}
        prevBlock1Transactions={prevBlock1Transactions}
        prevBlock2Transactions={prevBlock2Transactions}
      />
    )
  }
}

const mapStateToProps = state => ({
  blockNumber: state.web3.chain.blockNumber,
  prevBlock0Transactions: state.web3.chain.prevBlock0.transactions,
  prevBlock1Transactions: state.web3.chain.prevBlock1.transactions,
  prevBlock2Transactions: state.web3.chain.prevBlock2.transactions,
})

export default connect(
  mapStateToProps,
  undefined
)(SidebarContainer);
