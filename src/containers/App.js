import React from 'react';

/* Configuration Objects */
import store from '../store';

/* Configuration Components */
import { Provider } from 'react-redux';

/* Containers */
import HomepageContainer from './HomepageContainer';


/* Styles */

const App = () => (
  <Provider store={store}>
    <div className='App'>
      <HomepageContainer />
    </div>
  </Provider>
);

export default App;
