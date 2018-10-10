import React, { Component } from 'react';

/* Redux */
import { connect } from 'react-redux';
import { initializeGame } from '../redux/actions/game';

/* Components */
import Loader from '../components/Loader/Loader';

class InitializerHandler extends Component {
  componentDidMount() {
    const { initializeGame } = this.props;
    initializeGame();
  }

  render() {
    const { children, initialized } = this.props;
    if (initialized) {
      return (
        <div id='initializer-handler'>
          {children}
        </div>
      )
    } else {
      return (
        <Loader inProgress={true} />
      )
    }
  }
}

const mapStateToProps = state => ({
  initialized: state.status.game.initialized
})

const mapDispatchToProps = {
  initializeGame
}

export default connect(mapStateToProps, mapDispatchToProps)(InitializerHandler);
