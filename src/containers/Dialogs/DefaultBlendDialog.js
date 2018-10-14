/* Redux */
import { connect } from 'react-redux';
import { closeDefaultBlendDialog } from '../../redux/actions/ui';

/* Component */
import DefaultBlendDialog from '../../components/UI/Dialogs/DefaultBlendDialog';

const mapStateToProps = state => ({
  open: state.ui.defaultBlendDialog.open,
  color: state.data.players[state.web3.accounts.address].token.color,
  blendingColor: state.data.players[state.web3.accounts.address].token.defaultColor,
  blendingPrice: state.web3.contracts.RainbowToken.constants.defaultBlendingPrice.toString()
})

const mapDispatchToProps = {
  closeDialog: () => closeDefaultBlendDialog(),
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultBlendDialog);
