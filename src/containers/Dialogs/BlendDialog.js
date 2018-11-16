import React from 'react';

/* Redux */
import { connect } from 'react-redux';
import { closeBlendDialog } from '../../redux/actions/ui';
import { requestBlend } from '../../redux/actions/transactions/rainbowToken';

/* Component */
import BlendDialog from '../../components/Dialogs/BlendDialog';

const BlendDialogContainer = ({
  open,
  color,
  closeDialog,
  requestBlend,
  blendingAddress,
  blendingToken,
}) => (
  <BlendDialog
    open={open}
    color={color}
    closeDialog={closeDialog}
    blendingColor={blendingToken.color}
    blendingPrice={blendingToken.blendingPrice}
    launchTransaction={() => requestBlend(blendingAddress, blendingToken)}
  />
)

const mapStateToProps = state => ({
  open: state.ui.blendDialog.open,
  color: state.data.players[state.web3.account.address].token.color,
})

const mapDispatchToProps = {
  closeDialog: () => closeBlendDialog(),
  requestBlend
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlendDialogContainer);
