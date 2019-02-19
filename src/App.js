import React, { Component } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './css'
//import logo from './logo.svg';
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { Main } from './Main'
import { Col, Row } from './helpers/helpers'
import { getOrgUnits } from './api/api'
import { Sidebar } from './modules'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0d47a1',
        },
        secondary: {
            main: '#4db6ac',
        },
    },
    typography: {
        useNextVariants: true,
    },
    overrides: {
        MUIDataTableToolbar: {
            titleRoot: { marginLeft: 16 },
            titleText: { fontSize: '1.25rem !important' },
        },
    },
})

export class App extends Component {
    state = {
        orgUnits: null,
        selected: null,
    }

    onSelect = selected => {
        this.setState({ selected: selected })
    }

    componentDidMount = async () => {
        const orgUnits = await getOrgUnits()
        this.setState({
            orgUnits: orgUnits,
            selected: {
                id: orgUnits[0].id,
                name: orgUnits[0].displayName,
            },
        })
    }

    render() {
        if (!this.state.selected) return null

        return (
            <BrowserRouter>
                <HashRouter>
                    <MuiThemeProvider theme={theme}>
                        <div>
                            <HeaderBar appName="Record Capture" />
                            <Row>
                                <Col>
                                    <Sidebar
                                        onSelect={this.onSelect}
                                        selected={this.state.selected}
                                        orgUnits={this.state.orgUnits}
                                    />
                                </Col>
                                <Main selected={this.state.selected.id} />
                            </Row>
                        </div>
                    </MuiThemeProvider>
                </HashRouter>
            </BrowserRouter>
        )
    }
}
