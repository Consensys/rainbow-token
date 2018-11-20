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
  constructor(props) {
    super(props);
    this.state = {
      web3Loading: true,
      onRopsten: false
    }
  }

  componentDidMount () {
    const {
        getPlayers,
        getUser
    } = this.props;

    if (window.web3) {
      window.web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case "3":
            this.setState({
              web3Loading: false,
              onRopsten: true
            });
            break
          default:
            this.setState({
              web3Loading: false,
              onRopsten: false
            });
        }
      });
    } else {
      this.setState({
        web3Loading: false,
        onRopsten: false
      });
    }
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
    const { web3Loading, onRopsten } = this.state;
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
        connectedToMetamask={'address' in user.data}
        onRopsten={onRopsten}
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
