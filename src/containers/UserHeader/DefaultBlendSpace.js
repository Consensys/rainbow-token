/* Redux */
import { connect } from 'react-redux';
import { openDefaultBlendDialog } from '../../redux/actions/ui';

/* Component */
import DefaultBlendSpace from '../../components/UserHeader/DefaultBlendSpace';

const mapStateToProps = state => ({
  defaultColor: state.data.players[state.web3.account.address].token.defaultColor,
  disabled: !!state.web3.transactions.txHash,
})

const mapDispatchToProps = {
  onClick: () => openDefaultBlendDialog()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultBlendSpace);
