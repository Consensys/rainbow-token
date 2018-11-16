/* Redux */
import { connect } from 'react-redux';

/* Component */
import Footer from '../../components/Footer/Footer'

const mapStateToProps = state => ({
  blockNumber: state.web3.chain.number,
})

export default connect(
  mapStateToProps,
  undefined
)(Footer);
