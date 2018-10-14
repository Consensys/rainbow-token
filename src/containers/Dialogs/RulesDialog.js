/* Redux */
import { connect } from 'react-redux';
import { closeRulesDialog } from '../../redux/actions/ui';

/* Component */
import RulesDialog from '../../components/UI/Dialogs/RulesDialog';

const mapStateToProps = state => ({
  open: state.ui.rulesDialog.open,
  scroll: state.ui.rulesDialog.scroll
})

const mapDispatchToProps = {
  onClick: () => closeRulesDialog()
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RulesDialog);
