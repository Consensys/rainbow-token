/* Redux */
import { connect } from 'react-redux';

/* Component */
import Token from '../../components/UI/Token/Token';

const mapStateToProps = state => ({
  color: state.data.players[state.data.user.address].token.color,
  size: '80',
  boxShadowSize: '2',
  borderSize: '1.2'
})

export default connect(
  mapStateToProps,
  null
)(Token);
