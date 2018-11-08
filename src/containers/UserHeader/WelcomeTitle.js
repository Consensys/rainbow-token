import { connect } from 'react-redux';

import WelcomeTitle from '../../components/UserHeader/WelcomeTitle';

const mapStateToProps = state => ({
  address: state.data.user.address,
  pseudo: state.data.players[state.data.user.address]
})

export default connect(mapStateToProps, null)(WelcomeTitle);
