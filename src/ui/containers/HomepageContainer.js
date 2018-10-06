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
import {
  setUpWeb3
} from '../../redux/actions/web3';

import HomepageVisitor from '../components/HomepageVisitor';
import HomepagePlayer from '../components/HomepagePlayer';
import Loader from '../components/Loader';

class HomepageContainer extends Component {
  componentDidMount () {
      const {
          getPlayers,
          getUser,
          setUpWeb3
      } = this.props;

      setUpWeb3();
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
            onAvailableNetwork,
            metamaskUnlocked,
            web3Loading
        } = this.props;
        const display = user.isLoading || players.isLoading || web3Loading ? (
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
                metamaskUnlocked={metamaskUnlocked}
                onAvailableNetwork={onAvailableNetwork}
                inProgress={user.inProgress}
                startPlaying={startPlaying}
            />
        );
        return display;
    }
}

const mapStateToProps = state => ({
    user: state.user,
    players: state.players,
    currentPlayer: state.players.data[state.user.data.address],
    errors: state.errors,
    onAvailableNetwork: state.web3.onAvailableNetwork,
    metamaskUnlocked: state.web3.metamaskUnlocked,
    web3Loading: state.web3.isLoading,
});

const mapDispatchToProps = {
    getUser,
    getPlayers,
    startPlaying,
    blend: requestBlend,
    setBlendingPrice,
    setUpWeb3
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomepageContainer);
