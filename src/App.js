import React, { Component } from 'react';
//import logo from './logo.svg';
import { HashRouter } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import HeaderBar from "@dhis2/d2-ui-header-bar";
import Main from './Main';


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
      <HashRouter>
        <MuiThemeProvider theme={theme}>
          <HeaderBar d2={ this.props.d2 }/>
          <div style={{ marginTop: 60 }}>
            <Main/>
          </div>
        </MuiThemeProvider>
      </HashRouter>
    );
  }
}
