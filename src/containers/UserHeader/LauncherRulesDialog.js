/* Redux */
import { connect } from 'react-redux';
import { openRulesDialog } from '../../redux/actions/ui';

/* Component */
import LauncherRulesDialog from '../../components/UserHeader/LauncherRulesDialog';

const mapDispatchToProps = {
  onClick: () => openRulesDialog()
}

export default connect(
  null,
  mapDispatchToProps
)(LauncherRulesDialog);
