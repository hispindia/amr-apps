import React, { Component } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './App.css'
//import logo from './logo.svg';
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import { Main } from './Main'
import { Sidebar } from './modules'
import { Col, Row } from './helpers/helpers'
import { getOrgUnits } from './api/api'

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
                </HashRouter>
            </BrowserRouter>
        )
    }
}
