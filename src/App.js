import React from 'react';

/* Configuration Objects */
import createStore from './redux';

/* Configuration Components */
import { Provider } from 'react-redux';

/* Containers */
import HomepageContainer from './ui/containers/HomepageContainer';

/* Styles */
const App = () => (
    <Provider store={createStore()}>
        <div className='App'>
            <HomepageContainer />
        </div>
    </Provider>
);

export default App;
