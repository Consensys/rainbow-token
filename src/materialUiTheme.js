import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";

const materialUiTheme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(44, 86, 221)'
    },
    secondary: green,
    error: red
  },
  typography: {
    useNextVariants: true,
  },
});

export default materialUiTheme;
