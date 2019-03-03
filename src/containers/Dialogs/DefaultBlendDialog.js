/* Redux */
import { connect } from "react-redux";
import { closeDefaultBlendDialog } from "../../redux/actions/ui";
import { requestBlend } from "../../redux/actions/user";

/* Component */
import DefaultBlendDialog from "../../components/UI/Dialogs/DefaultBlendDialog";

/* Constants */
import { defaultBlendingPrice } from "../../constants";

const mapStateToProps = state => ({
    open: state.ui.defaultBlendDialog.open,
    color: state.data.players[state.web3.accounts.defaultAccount].token.color,
    blendingColor:
        state.data.players[state.web3.accounts.defaultAccount].token.defaultColor,
    blendingPrice: defaultBlendingPrice.toString()
});

const mapDispatchToProps = {
    closeDialog: () => closeDefaultBlendDialog(),
    launchTransaction: () => requestBlend()
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultBlendDialog);
