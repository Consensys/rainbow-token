import React from 'react';

/* Redux */
import { connect } from 'react-redux';

/* Components */
import Loader from '../components/Loader/Loader';

const LoadingHandler = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <Loader inProgress={true} />
    )
  } else {
    return (
      <div id='LoadingHandler'>
        {children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.status.user.isLoading || state.status.web3.isLoading
})

export default connect(mapStateToProps, null)(LoadingHandler);
