/* Redux */
import { connect } from 'react-redux';
import { startPlaying } from '../../redux/actions/user';

/* Components */
import StartPlayingButton from '../../components/Homepage/StartPlayingButton';

const mapStateToProps = state => ({
  txInProgress: state.web3.txs.length > 0 || false,
  locked: !(state.web3.onAvailableNetwork && state.web3.metamaskUnlocked)
})

const mapDispatchToProps = {
  onClick: () => startPlaying()
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPlayingButton)
