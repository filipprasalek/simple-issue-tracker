import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from 'pages/Dashboard';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import {theme} from 'utils/theme';
import './index.css';

function App() {
  return <Dashboard/>;
}

ReactDOM.render((
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>
), document.getElementById('index'));