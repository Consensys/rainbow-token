import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getUser,
  requestPlaying,
  requestAUthoBlend,
  requestBlend,
  updateUserColor,
} from '../../redux/actions/user';
import { 
  getPlayers,
  updateToken, 
  newPlayer, 
} from '../../redux/actions/players';

import { RgbWallet_event, web3_event, web3_event_main, web3_event_rinkeby } from '../../web3';
import { color } from '../../web3/utils';

import HomepageVisitor from '../components/HomepageVisitor';
import HomepagePlayer from '../components/HomepagePlayer';
import Loader from '../components/Loader';


const mapStateToProps = state => ({
  user: state.user,
  players: state.players,
  currentPlayer: state.players.data.find(player => (player.address == user.data.address)),
  errors: state.errors
});

const mapDispatchToProps = {
  getUser,
  updateUserColor,
  getPlayers,
  newPlayer,
  updateToken,
  startPlaying: requestPlaying,
  blend: requestBlend,
};

class HomepageContainer extends Component {

  componentDidMount() {
    this.props.getUser();
    this.props.loadPlayers();

    // Register event listeners
    RgbWallet_event.TokenBlended({}, (err, event) => {
      console.log('New Blending!', event);
    })
    .on('data', event => {
      console.log('New Blending!');
      const { player, r, g, b } = event.returnValues;
      const 
      if (player === this.props.user.data.address) this.props.updateUserColor(color([r, g, b]));
      this.props.updateToken(player, color([r, g, b]));
    })
    .on('error', console.log);

    RgbWallet_event.PlayerCreated({}, (err, event) => {
      console.log('New Player!', event);
    })
    .on('data', event => {
      console.log('New Player!');
      const { player } = event.returnValues;
      this.props.newPlayer(player);
    })
    .on('error', console.log);
  }

  render() {
    const { 
      user, 
      players, 
      currentPlayer,
      startPlaying, 
      blend 
    } = this.props;
    const display = user.isLoading || players.isLoading ? (
      <Loader />
    ) : currentPlayer ? (
      <HomepagePlayer
        inProgress={user.inProgress}
        currentPlayer
        players={players.data}
        blend
      />
    ) : (
      <HomepageVisitor
        inProgress={user.inProgress}
        pseudo={user.data.pseudo}
        startPlaying
      />
    )
    return display;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomepageContainer);
