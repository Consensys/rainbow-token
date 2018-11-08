/* Redux */
import { connect } from 'react-redux';

/* Components */
import UserProgress from '../../components/UserHeader/UserProgress';

const mapStateToProps = state => ({
  score: state.data.players[state.data.user.address].score,
})

export default connect(
  mapStateToProps,
  null
)(UserProgress);
