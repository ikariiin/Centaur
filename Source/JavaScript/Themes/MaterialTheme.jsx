import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export const MaterialTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#09599a',
      light: '#5185cb',
      dark: '#00316b',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#eb5a00',
      contrastText: '#ffffff',
      light: '#ef7b33',
      dark: '#a43e00'
    },
  },
  typography: {
    fontFamily: `"Google Sans", "Poppins", "Roboto", "Helvetica Nueu", "Quicksand", "Segoe UI", "Calibri", Arial, sans-serif`,
  },
});