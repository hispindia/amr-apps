import React, { Component } from 'react'
import { Sidebar } from 'modules'
import { Row } from 'helpers'
import { getOrgUnits } from 'api'
import { menuItems } from '../../config'
import { Main } from '../'

export class AppContent extends Component {
    state = {
        orgUnits: null,
        selected: null,
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

    onSelect = selected => this.setState({ selected: selected })

    render() {
        const { selected } = this.state
        if (!selected) return null

        return (
            <Row>
                <Sidebar
                    onSelect={this.onSelect}
                    selected={selected}
                    orgUnits={this.state.orgUnits}
                    menuItems={menuItems}
                />
                <Main selected={selected.id} />
            </Row>
        )
    }
}
