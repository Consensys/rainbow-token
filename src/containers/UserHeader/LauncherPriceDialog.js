/* Redux */
import { connect } from 'react-redux';
import { openPriceDialog } from '../../redux/actions/ui';

/* Component */
import LauncherPriceDialog from '../../components/UserHeader/LauncherPriceDialog';

const mapStateToProps = state => ({
  disabled: !!state.web3.transactions.txHash
})

const mapDispatchToProps = {
  onClick: () => openPriceDialog()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LauncherPriceDialog);
