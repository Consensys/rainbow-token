/* Redux */
import { connect } from 'react-redux';

/* Component */
import UserSpace from '../../components/UserHeader/UserSpace';

const mapStateToProps = state => ({
  currentColor: state.data.players[state.web3.account.address].token.color,
  score: state.data.players[state.web3.account.address].score,
})

export default connect(
  mapStateToProps,
  undefined
)(UserSpace);
