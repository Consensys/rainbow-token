/* Redux */
import { connect } from "react-redux";
import { startPlaying } from "../../redux/actions/transactions/rainbowToken";

/* Components */
import StartPlayingButton from "../../components/Homepage/StartPlayingButton";

const mapStateToProps = state => ({
    txInProgress: !!state.web3.transactions.txHash,
    locked: !(
        state.status.web3.onAvailableNetwork &&
        state.status.web3.metamaskUnlocked
    )
});

const mapDispatchToProps = {
    onClick: () => startPlaying()
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartPlayingButton);
