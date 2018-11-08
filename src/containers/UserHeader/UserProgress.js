/* Redux */
import { connect } from 'react-redux';

/* Components */
import UserProgress from '../../components/UserHeader/UserProgress';

const mapStateToProps = state => ({
  score: state.data.players[state.web3.account.address].score,
})

export default connect(
  mapStateToProps,
  null
)(UserProgress);
