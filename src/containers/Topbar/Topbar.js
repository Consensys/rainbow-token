/* Redux */
import { connect } from "react-redux";
import {
  openPriceDialog,
  openDefaultBlendDialog,
  openRulesDialog,
} from "../../redux/actions/ui";

/* Component */
import Topbar from "../../components/Topbar/Topbar";

const mapStateToProps = state => ({
    player: state.data.players[state.web3.accounts.defaultAccount],
    balance: state.web3.accounts.list.get(state.web3.accounts.defaultAccount),
    txInProgress: state.web3.transactions.txInProgress,
});

const mapDispatchToProps = {
  openPriceDialog,
  openDefaultBlendDialog,
  openRulesDialog
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Topbar);
