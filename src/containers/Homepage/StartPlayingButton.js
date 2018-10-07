/* Redux */
import { connect } from 'react-redux';
import { startPlaying } from '../../redux/actions/user';

/* Components */
import StartPlayingButton from '../../components/Homepage/StartPlayingButton';

const mapStateToProps = state => ({
  txInProgress: state.web3.txHash,
  locked: !(state.status.web3.onAvailableNetwork && state.status.web3.metamaskUnlocked),
})

const mapDispatchToProps = {
  onClick: () => startPlaying()
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPlayingButton)
