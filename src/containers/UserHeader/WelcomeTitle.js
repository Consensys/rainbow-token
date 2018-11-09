import { connect } from 'react-redux';

import WelcomeTitle from '../../components/UserHeader/WelcomeTitle';

const mapStateToProps = state => ({
  address: state.web3.account.address,
  pseudo: state.data.players[state.web3.account.address].pseudo
})

export default connect(mapStateToProps, null)(WelcomeTitle);
