import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';

/* Component */
import Sidebar from '../../components/Sidebar/Sidebar'

class SidebarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.blockNumber
    }
  }

  componentDidUpdate(prevProps) {
    const { blockNumber } = this.props;
    if (prevProps.blockNumber !== blockNumber) {
      const stuff = [ ...document.getElementsByClassName('box') ]
      .map(el => el.classList);
      stuff.forEach(el => el.toggle('animated'));
      setTimeout(
        () => {
          stuff.forEach(el => el.toggle('animated'));
          this.setState({ value: blockNumber })
        }, 1500
      );
    }
  }

  render() {
    const { value } = this.state;
    return (
      <Sidebar
        blockNumber={value}
      />
    )
  }
}

const mapStateToProps = state => ({
  blockNumber: state.web3.chain.number,
})

export default connect(
  mapStateToProps,
  undefined
)(SidebarContainer);
