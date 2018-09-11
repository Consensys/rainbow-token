import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    getUser,
    requestBlend,
    setBlendingPrice,
    startPlaying,
} from '../../redux/actions/user';
import {
    getPlayers
} from '../../redux/actions/players';

import HomepageVisitor from '../components/HomepageVisitor';
import HomepagePlayer from '../components/HomepagePlayer';
import Loader from '../components/Loader';

const mapStateToProps = state => ({
    user: state.user,
    players: state.players,
    currentPlayer: state.players.data[state.user.data.address],
    errors: state.errors,
});

const mapDispatchToProps = {
    getUser,
    getPlayers,
    startPlaying,
    blend: requestBlend,
    setBlendingPrice,
};

class HomepageContainer extends Component {
    componentDidMount () {
        const {
            getPlayers,
            getUser
        } = this.props;

        getPlayers();
        getUser();
    }

    render () {
        const {
            user,
            players,
            currentPlayer,
            blend,
            setBlendingPrice,
            startPlaying,
        } = this.props;

        const display = user.isLoading || players.isLoading ? (
            <Loader inProgress={true} />
        ) : currentPlayer ? (
            <HomepagePlayer
                inProgress={user.inProgress}
                currentPlayer={currentPlayer}
                players={players.data}
                blend={blend}
                setBlendingPrice={setBlendingPrice}
            />
        ) : (
            <HomepageVisitor
                inProgress={user.inProgress}
                startPlaying={startPlaying}
            />
        );
        return display;
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomepageContainer);
