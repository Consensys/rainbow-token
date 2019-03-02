// Libs
import React, { Component } from "react";
import PropTypes from 'prop-types';

/* Redux */
import { connect } from "react-redux";
import { initialize } from "../redux/actions/setUp";

/* Components */
import LoadingPage from "../components/LoadingPage/LoadingPage";

class InitializerHandler extends Component {
    componentWillMount() {
        const { initialize } = this.props;
        initialize();
    }

    render() {
        const { children, isSetUpLoading, isPlayersLoading } = this.props;
        if (isSetUpLoading || isPlayersLoading) {
            return <LoadingPage isPlayersLoading={isPlayersLoading} />;
        } else {
            return <div id="initializer-handler">{children}</div>;
        }
    }
}

const mapStateToProps = state => ({
    isSetUpLoading: state.status.setUp.isLoading,
    isPlayersLoading: state.status.players.isLoading
});

const mapDispatchToProps = {
    initialize
};

InitializerHandler.propTypes = {
  initialize: PropTypes.func.isRequired,
  isSetUpLoading: PropTypes.bool.isRequired,
  isPlayersLoading: PropTypes.bool.isRequired,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InitializerHandler);
