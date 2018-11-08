/* Redux */
import { connect } from 'react-redux';

/* Component */
import Token from '../../components/UI/Token/Token';

import { targetColor } from '../../constants/rainbowToken';

const mapStateToProps = state => ({
  color: targetColor,
  size: '60',
  boxShadowSize: '1.6',
  borderSize: '1.2'
})

export default connect(
  mapStateToProps,
  null
)(Token);
