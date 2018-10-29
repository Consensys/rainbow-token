/* Redux */
import { connect } from 'react-redux';

/* Component */
import Footer from '../../components/Homepage/Footer';

const mapStateToProps = state => ({
  metamaskUnlocked: state.status.web3.metamaskUnlocked,
  onAvailableNetwork: state.status.web3.onAvailableNetwork
})

export default connect(
  mapStateToProps,
  null
)(Footer);
