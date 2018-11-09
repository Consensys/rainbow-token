/* Redux */
import { connect } from 'react-redux';
import { openRulesDialog } from '../../redux/actions/ui';

/* Component */
import ConsenSysElement from '../../components/UserHeader/ConsenSysElement';

const mapDispatchToProps = {
  onClick: () => openRulesDialog()
}

export default connect(
  null,
  mapDispatchToProps
)(ConsenSysElement);
