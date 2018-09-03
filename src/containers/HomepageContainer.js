import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchUser,
  requestPlaying,
  requestBlendWithSelf,
  requestBlendWithOthers,
  updateUserRgb
} from '../store/actions/user';
import { fetchPlayers, updatePlayerRgb, addNewPlayer } from '../store/actions/players';

import { RgbWallet_event, web3_event, web3_event_main, web3_event_rinkeby } from '../util/connectors';

import HomepageVisitor from '../components/HomepageVisitor';
import HomepagePlayer from '../components/HomepagePlayer';
import Loader from '../components/Loader';


const mapStateToProps = state => ({
  user: state.user,
  players: state.players,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => dispatch(fetchUser()),
  triggerUserUpdate: updatedRGB => dispatch(updateUserRgb(updatedRGB)),
  loadPlayers: () => dispatch(fetchPlayers()),
  triggerNewPlayer: playerAddress => dispatch(addNewPlayer(playerAddress)),
  triggerPlayerUpdate: (blender, updatedRGB) => dispatch(updatePlayerRgb(blender, updatedRGB)),
  onStartPlaying: e => {
    e.preventDefault();
    dispatch(requestPlaying());
  },
  onBlendWithSelf: e => {
    e.preventDefault();
    dispatch(requestBlendWithSelf());
  },
  onBlendWithOthers: (e, otherAddress, otherR, otherG, otherB) => {
    e.preventDefault();
    dispatch(requestBlendWithOthers(otherAddress, otherR, otherG, otherB));
  }
});

class HomepageContainer extends Component {

  componentDidMount() {
    this.props.loadUser();
    this.props.loadPlayers();

    RgbWallet_event.Blending({}, (err, event) => {
      console.log('New Blending!', event);
    })
    .on('data', event => {
      console.log('New Blending!');
      const { blender, r, g, b } = event.returnValues;
      if (blender === this.props.user.data.address) this.props.triggerUserUpdate([r, g, b]);
      this.props.triggerPlayerUpdate(blender, [r, g, b]);
    })
    .on('error', console.log);
    RgbWallet_event.NewPlayer({}, (err, event) => {
      console.log('New Player!', event);
    })
    .on('data', event => {
      console.log('New Player!');
      const { playerAddress } = event.returnValues;
      this.props.triggerNewPlayer(playerAddress);
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
