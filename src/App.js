import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
//import logo from './logo.svg';
import { HashRouter } from 'react-router-dom'
import { Main } from './Main'
import { Header } from './modules/Header'
import { Drawer } from '@material-ui/core'
import { OrgUnitTree } from './modules'

export class App extends Component {
    state = { drawer: true }

    onClick = () => {
        this.setState({ drawer: !this.state.drawer })
    }

    render() {
        return (
            <BrowserRouter>
                <HashRouter>
                    <div>
                        <Header />
                        <Drawer variant="persistent" open={this.state.drawer}>
                            <div style={{ padding: 16 }}>
                                <OrgUnitTree onClick={this.onClick} />
                            </div>
                        </Drawer>
                        <Main />
                    </div>
                </HashRouter>
            </BrowserRouter>
        )
    }
}
