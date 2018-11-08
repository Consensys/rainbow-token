import React from 'react';

/* Configuration Objects */
import createStore from './redux';

/* Configuration Components */
import { Provider } from 'react-redux';

/* Components */
import Homepage from './components/Homepage/Homepage';
import Dashboard from './components/Dashboard/Dashboard';

/* Theme related */
import { MuiThemeProvider } from "@material-ui/core/styles";
import materialUiTheme from "./ui/materialUiTheme";

/* Wrappers */
import Wrappers from './wrappers';

/* Styles */
const App = () => {
  const NonCurrentPlayer = Wrappers.OnlyVisibleForNonPlayer(Homepage);
  const CurrentPlayer = Wrappers.OnlyVisibleForPlayer(Dashboard);
  return (
    <Provider store={createStore()}>
      <div className='App'>
        <MuiThemeProvider theme={materialUiTheme}>
          <Wrappers.InitializerHandler >
            <NonCurrentPlayer />
            <CurrentPlayer />
          </Wrappers.InitializerHandler >
        </MuiThemeProvider>
      </div>
    </Provider>
  )
}

export default App;
