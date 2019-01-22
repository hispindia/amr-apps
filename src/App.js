import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
//import logo from './logo.svg';
import { HashRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Main from './Main';
import { Header } from './modules/Header';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1c54b2"
    }
  },
  typography: {
    useNextVariants: true
  }
});

export class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <HashRouter>
        <MuiThemeProvider theme={theme}>
          <Header/>
          <div style={{ marginTop: 16 }}>
            <Main/>
          </div>
        </MuiThemeProvider>
      </HashRouter>
      </BrowserRouter>
    );
  }
}
