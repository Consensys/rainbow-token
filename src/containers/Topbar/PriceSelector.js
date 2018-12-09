import Web3 from "web3";

/* Redux */
import { connect } from "react-redux";
import { openPriceDialog } from "../../redux/actions/ui";

/* Component */
import PriceSelector from "../../components/Topbar/PriceSelector";

const mapStateToProps = state => ({
    blendingPrice: Web3.utils.fromWei(
        state.data.players[state.web3.account.address].token.blendingPrice,
        "ether"
    ),
    disabled: !!state.web3.transactions.txHash
});

const mapDispatchToProps = {
    onClick: () => openPriceDialog()
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceSelector);
