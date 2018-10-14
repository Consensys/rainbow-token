import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import { initializeGame } from '../redux/actions/game';

/* Components */
import LoadingPage from '../components/LoadingPage/LoadingPage';

class InitializerHandler extends Component {
  componentDidMount() {
    const { initializeGame } = this.props;
    initializeGame();
  }

  render() {
    const { children, initialized, playersLoading } = this.props;
    if (initialized && !playersLoading) {
      return (
        <div id='initializer-handler'>
          {children}
        </div>
      )
    } else {
      return (
        <LoadingPage />
      )
    }
  }
}

const mapStateToProps = state => ({
  initialized: state.status.game.initialized,
  playersLoading: state.status.players.isLoading
})

const mapDispatchToProps = {
  initializeGame
}

export default connect(mapStateToProps, mapDispatchToProps)(InitializerHandler);
