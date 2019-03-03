/* Redux */
import { connect } from "react-redux";
import { requestClaimVictory } from "../../redux/actions/user";

/* Component */
import VictoryDialog from "../../components/UI/Dialogs/VictoryDialog";

/* Constant */
import { winningConstant, targetColor } from '../../constants'

const isCloseEnough = ({ r, g, b }) => {
  const isCloseR = (Number(r) + winningConstant >= Number(targetColor.r)) && (Number(r) <= Number(targetColor.r) + winningConstant);
  const isCloseG = (Number(g) + winningConstant >= Number(targetColor.g)) && (Number(g) <= Number(targetColor.g) + winningConstant);
  const isCloseB = (Number(b) + winningConstant >= Number(targetColor.b)) && (Number(b) <= Number(targetColor.b) + winningConstant);
  return isCloseR && isCloseG && isCloseB;
}

const mapStateToProps = state => ({
    open: isCloseEnough(state.data.players[state.web3.accounts.defaultAccount].token.color)
});

const mapDispatchToProps = {
    requestClaimVictory
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VictoryDialog);
