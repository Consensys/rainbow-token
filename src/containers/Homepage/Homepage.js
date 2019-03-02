/* Redux */
import { connect } from "react-redux";
import { requestPlay } from "../../redux/actions/user";

/* Components */
import Homepage from "../../components/Homepage/Homepage";

const mapStateToProps = state => ({
  onAvailableNetwork: state.web3.network.id === 3 || true,
  txInProgress: state.web3.transactions.txInProgress,
  metamaskUnlocked: !!state.web3.accounts.defaultAccount,
});

const mapDispatchToProps = {
    requestPlay
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Homepage);
