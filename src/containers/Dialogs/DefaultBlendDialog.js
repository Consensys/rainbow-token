/* Redux */
import { connect } from 'react-redux';
import { closeDefaultBlendDialog } from '../../redux/actions/ui';
import { requestBlend } from '../../redux/actions/transactions/rainbowToken';

/* Component */
import DefaultBlendDialog from '../../components/Dialogs/DefaultBlendDialog';

/* Constants */
import { defaultBlendingPrice } from '../../constants/rainbowToken';

const mapStateToProps = state => ({
  open: state.ui.defaultBlendDialog.open,
  color: state.data.players[state.data.user.address].token.color,
  blendingColor: state.data.players[state.data.user.address].token.defaultColor,
  blendingPrice: defaultBlendingPrice.toString()
})

const mapDispatchToProps = {
  closeDialog: () => closeDefaultBlendDialog(),
  launchTransaction: () => requestBlend()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultBlendDialog);
