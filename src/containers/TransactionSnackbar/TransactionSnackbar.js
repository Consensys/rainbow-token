/* Redux */
import { connect } from "react-redux";

/* Component */
import TransactionSnackbar from "../../components/UI/TransactionSnackbar/TransactionSnackbar";

const mapStateToProps = state => ({
    txInProgress: state.web3.transactions.txInProgress,
    address: state.web3.accounts.defaultAccount,
});

export default connect(
    mapStateToProps,
    null
)(TransactionSnackbar);
