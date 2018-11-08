/* Redux */
import { connect } from 'react-redux';

import Web3 from 'web3';

/* COmponent */
import PriceDisplayer from '../../components/UserHeader/PriceDisplayer';

const mapStateToProps = state => ({
  blendingPrice: Web3.utils.fromWei(state.data.players[state.data.user.address].token.blendingPrice, 'ether')
})

export default connect(
  mapStateToProps,
  null
)(PriceDisplayer);
