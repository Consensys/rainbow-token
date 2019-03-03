import React from 'react';

/* Configuration Objects */
import createStore from './redux';

/* Configuration Components */
import { Provider } from 'react-redux';

/* Components */
import Homepage from "./containers/Homepage/Homepage";
import Dashboard from "./components/Dashboard/Dashboard";

/* Theme related */
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from '@material-ui/core';
import theme from "./constants/theme";

/* Wrappers */
import Wrappers from "./wrappers";

/* Styles */
const App = () => {
  const NonCurrentPlayer = Wrappers.OnlyVisibleForNonPlayer(Homepage);
  const CurrentPlayer = Wrappers.OnlyVisibleForPlayer(Dashboard);
  return (
    <Provider store={createStore()}>
      <div className='App'>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Wrappers.InitializerHandler>
              <NonCurrentPlayer />
              <CurrentPlayer />
          </Wrappers.InitializerHandler>
        </MuiThemeProvider>
      </div>
    </Provider>
  )
}

export default App;
