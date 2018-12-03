/* Redux */
import { connect } from 'react-redux';

/* Component */
import TransactionLoader from '../../components/Sidebar/TransactionLoader';

const mapStateToProps = state => ({
  txHash: state.web3.transactions.txHash
})

export default connect(
  mapStateToProps,
  undefined
)(TransactionLoader);
