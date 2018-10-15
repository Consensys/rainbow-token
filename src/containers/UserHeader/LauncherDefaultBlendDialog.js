/* Redux */
import { connect } from 'react-redux';
import { openDefaultBlendDialog } from '../../redux/actions/ui';

/* Components */
import LauncherDefaultBlendDialog from '../../components/UserHeader/LauncherDefaultBlendDialog';

const mapStateToProps = state => ({
  disabled: !!state.web3.transactions.txHash
})

const mapDispatchToProps = {
  onClick: () => openDefaultBlendDialog()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LauncherDefaultBlendDialog)
