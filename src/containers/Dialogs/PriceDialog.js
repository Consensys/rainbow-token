/* Redux */
import { connect } from "react-redux";
import {
    closePriceDialog,
    modifyBlendingPriceInput
} from "../../redux/actions/ui";
import { setBlendingPrice } from "../../redux/actions/transactions/rainbowToken";

/* Component */
import PriceDialog from "../../components/Dialogs/PriceDialog";

const mapStateToProps = state => ({
    open: state.ui.priceDialog.open,
    blendingPriceInput: state.ui.priceDialog.blendingPriceInput
});

const mapDispatchToProps = {
    closeDialog: () => closePriceDialog(),
    modifyBlendingPriceInput,
    setBlendingPrice
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PriceDialog);
