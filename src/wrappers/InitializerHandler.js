import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import { initializeGame } from '../redux/actions/gameManager/game';

/* Components */
import LoadingPage from '../components/LoadingPage/LoadingPage';

class InitializerHandler extends Component {
  componentDidMount() {
    const { initializeGame } = this.props;
    initializeGame();
  }

  render() {
    const { children, isLoading } = this.props;
    if (isLoading) {
      return (
        <LoadingPage />
      )
    } else {
      return (
        <div id='initializer-handler'>
          {children}
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  isLoading: state.status.game.isLoading,
})

const mapDispatchToProps = {
  initializeGame
}

export default connect(mapStateToProps, mapDispatchToProps)(InitializerHandler);
