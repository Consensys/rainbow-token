import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';

/* Component */
import Footer from '../../components/Footer/Footer'

class FooterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.blockNumber
    }
  }

  componentDidUpdate() {
    const { blockNumber } = this.props;
    setTimeout(
      () => this.setState({ value: blockNumber })
      , 5000
    );
  }

  render() {
    const { value } = this.state;
    return (
      <Footer
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
)(FooterContainer);
