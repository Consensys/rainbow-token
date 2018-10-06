import React from 'react';

/* Configuration Objects */
import createStore from './redux';

/* Configuration Components */
import { Provider } from 'react-redux';

/* Containers */
// import HomepageContainer from './ui/containers/HomepageContainer';

/* Components */
import Homepage from './components/Homepage/Homepage';
// import Dashboard from './ui/components/Dashboard';

/* Theme related */
import { MuiThemeProvider } from "@material-ui/core/styles";
import materialUiTheme from "./ui/materialUiTheme";

/* Wrappers */
import Wrappers from './wrappers';

/* Styles */
const App = () => {
  const CurrentPlayer = Wrappers.OnlyVisibleForPlayer(() => (
    <div>HOLA</div>
  ))
  const NonCurrentPlayer = Wrappers.OnlyVisibleForNonPlayer(Homepage)
  return (
    <Provider store={createStore()}>
      <div className='App'>
        <MuiThemeProvider theme={materialUiTheme}>
          < Wrappers.Web3Handler >
            <NonCurrentPlayer />
            <CurrentPlayer />
          </ Wrappers.Web3Handler >
        </MuiThemeProvider>
      </div>
    </Provider>
  )
}

export default App;


// @channel For educational purpose, Paris team has recently been working on a token model named Rainbow Token :rainbow::rainbow:, we are currently beta testing the dapp on Ropsten.
