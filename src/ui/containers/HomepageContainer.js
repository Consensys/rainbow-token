import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getUser,
  requestPlaying,
  requestBlend,
  setBlendingPrice,
} from '../../redux/actions/user';
import { 
  getPlayers,
  newPlayer, 
  updatePlayerToken,
} from '../../redux/actions/players';

import { RainbowTokenWs } from '../../web3';
import { color } from '../../web3/utils';

import HomepageVisitor from '../components/HomepageVisitor';
import HomepagePlayer from '../components/HomepagePlayer';
import Loader from '../components/Loader';


const mapStateToProps = state => ({
  user: state.user,
  players: state.players,
  currentPlayer: state.players.data[state.user.data.address],
  errors: state.errors
});

const mapDispatchToProps = {
  getUser,
  updatePlayerToken,
  getPlayers,
  newPlayer,
  blend: requestBlend,
  setBlendingPrice,
};

class HomepageContainer extends Component {

  componentDidMount() {
    const {
      getPlayers,
      getUser,
      updatePlayerToken,
    } = this.props;

    getPlayers();
    getUser();

    // Register event listeners
    RainbowTokenWs.TokenBlended({}, (err, event) => {
      console.log('New Blending!', event);
    })
    .on('data', event => {
      console.log('New Blending!');
      const { player, r, g, b } = event.returnValues;
      updatePlayerToken(player, color([r, g, b]));
    })
    .on('error', console.log);
    
    //
    RainbowTokenWs.BlendingPriceSet({}, (err, event) => {
      console.log('New Blending!', event);
    })
    .on('data', event => {
      console.log('New price set!');
      const { player, price } = event.returnValues;
      updatePlayerToken(player, undefined, price);
    })
    .on('error', console.log);

    RainbowTokenWs.PlayerCreated({}, (err, event) => {
      console.log('New Player!', event);
    })
    .on('data', event => {
      console.log('New Player!');
      const { player } = event.returnValues;
      newPlayer(player);
    })
    .on('error', console.log);
    
    RainbowTokenWs.PlayerWon({}, (err, event) => {
      console.log('Player Won!', event);
    })
    .on('data', event => {
      const { player } = event.returnValues;
      console.log(player, 'Won');      
    })
    .on('error', console.log);
  }

  render() {
    const { 
      user, 
      players, 
      currentPlayer,
      newPlayer, 
      blend,
      setBlendingPrice
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
        newPlayer={newPlayer}
      />
    )
    return display;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomepageContainer);
