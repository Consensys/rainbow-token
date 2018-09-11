import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const materialUiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2c56dd'
    },
    secondary: green,
    error: red
  }
});

export default materialUiTheme;
