import React from 'react';
import ReactDOM from 'react-dom';

/* Containers & Components */
import App from './containers/App';

/* Styles */
import './css/index.css';

/* Methods & Functions */
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
