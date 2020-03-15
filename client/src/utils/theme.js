import { createMuiTheme } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});