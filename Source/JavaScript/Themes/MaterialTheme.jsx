import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const MaterialTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#09599a',
      light: '#5185cb',
      dark: '#00316b',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#e91e63',
      contrastText: '#ffffff',
      light: '#ff6090',
      dark: '#b0003a'
    },
  },
  typography: {
    fontFamily: `"Google Sans", "Poppins", "Roboto", "Helvetica Nueu", "Quicksand", "Segoe UI", "Calibri", Arial, sans-serif`,
  },
});