/* Redux */
import { connect } from 'react-redux';

/* Component */
import Token from '../../components/UI/Token/Token';

const mapStateToProps = state => ({
  color: state.data.players[state.web3.account.address].token.defaultColor,
  size: '60',
  boxShadowSize: '1.6',
  borderSize: '1.2'
})

export default connect(
  mapStateToProps,
  null
)(Token);
