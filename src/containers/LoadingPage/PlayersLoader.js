import { connect } from "react-redux";

import PlayersLoader from "../../components/LoadingPage/PlayersLoader";

const mapStateToProps = state => ({
    playersLoading: state.status.players.isLoading
});

export default connect(
    mapStateToProps,
    null
)(PlayersLoader);
