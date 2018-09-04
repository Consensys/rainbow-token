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
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(getUser()),
  triggerUserUpdate: updatedColor => dispatch(updateUserColor(updatedColor)),
  loadPlayers: () => dispatch(getPlayers()),
  triggerNewPlayer: playerAddress => dispatch(newPlayer(playerAddress)),
  triggerPlayerUpdate: (address, color) => dispatch(updateToken(address, color)),
  onStartPlaying: e => {
    e.preventDefault();
    dispatch(requestPlaying());
  },
  onAutoBlend: e => {
    e.preventDefault();
    dispatch(requestAutoBlend());
  },
  onBlend: (e, blendingAddress, blendingPrice, blendingR, blendingG, blendingB) => {
    e.preventDefault();
    dispatch(requestBlend(blendingAddress, blendingPrice, blendingR, blendingG, blendingB));
  }
});

class HomepageContainer extends Component {

  componentDidMount() {
    this.props.loadUser();
    this.props.loadPlayers();

    RgbWallet_event.TokenBlended({}, (err, event) => {
      console.log('New Blending!', event);
    })
    .on('data', event => {
      console.log('New Blending!');
      const { player, r, g, b } = event.returnValues;
      const 
      if (player === this.props.user.data.address) this.props.triggerUserUpdate(color([r, g, b]));
      this.props.triggerPlayerUpdate(player, color([r, g, b]));
    })
    .on('error', console.log);
    RgbWallet_event.PlayerCreated({}, (err, event) => {
      console.log('New Player!', event);
    })
    .on('data', event => {
      console.log('New Player!');
      const { player } = event.returnValues;
      this.props.triggerNewPlayer(player);
    })
    .on('error', console.log);
  }

  render() {
    const { user, players, onStartPlaying, onBlendWithSelf, onBlendWithOthers } = this.props;
    const display = user.isLoading || players.isLoading ? (
      <Loader />
    ) : user.isPlaying ? (
      <HomepagePlayer
        inProgress={user.inProgress}
        user={user.data}
        players={players.data}
        onBlendWithSelf={onBlendWithSelf}
        onBlendWithOthers={onBlendWithOthers}
      />
    ) : (
      <HomepageVisitor
        inProgress={user.inProgress}
        pseudo={user.data.pseudo}
        onStartPlaying={onStartPlaying}
      />
    )
    return display;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomepageContainer);
