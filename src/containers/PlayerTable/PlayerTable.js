// Libs
import React from "react";
import Web3 from 'web3';
/* Redux */
import { connect } from "react-redux";
import { openBlendDialog } from "../../redux/actions/ui";

/* Component */
import PlayerTable from "../../components/PlayerTable/PlayerTable";
import Token from '../../components/UI/Token/Token';

const formatPlayers = (players, userAddress) => {
  const playersCopy = { ...players };
  delete playersCopy[userAddress];
  return Object.values(playersCopy).map(
    ({ pseudo, score, token, address }) => ({
      pseudo,
      pseudoDisplay: (
          <span style={{'textTransform': 'capitalize'}}>{pseudo}</span>
      ),
      token,
      tokenIcon: (
        <Token
          color={token.color}
          size="28"
          boxShadowSize=".5"
          borderSize=".5"
        />
      ),
      blendingPrice: Web3.utils.fromWei(token.blendingPrice, 'ether'),
      score,
      address
    })
  );
}

const mapStateToProps = state => ({
    address: state.web3.accounts.defaultAccount,
    rows: formatPlayers(state.data.players, state.web3.accounts.defaultAccount),
    txInProgress: state.web3.transactions.txInProgress,
});

const mapDispatchToProps = {
    openBlendDialog
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerTable);
