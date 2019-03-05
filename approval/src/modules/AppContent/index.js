import React, { Component } from 'react'
import { Sidebar } from 'modules'
import { Row } from 'helpers'
import { getOrgUnits, getEvents } from 'api'
import { menuItems } from '../../config'
import { Main } from '../'

export class AppContent extends Component {
    state = {
        orgUnits: null,
        selected: null,
        loading: false,
    }

    componentDidMount = async () => {
        const orgUnits = await getOrgUnits()
        const selected = {
            id: orgUnits[0].id,
            name: orgUnits[0].displayName,
        }
        const eventLists = await getEvents(selected.id)
        let counts = {}
        Object.keys(eventLists).forEach(
            key => (counts[key] = eventLists[key].length)
        )

        this.setState({
            orgUnits: orgUnits,
            selected: selected,
            eventLists: eventLists,
            counts: counts,
        })
    }

    onSelect = async selected => {
        this.setState({ selected: selected, loading: true })
        const eventLists = await getEvents(selected.id)
        let counts = {}
        Object.keys(eventLists).forEach(
            key => (counts[key] = eventLists[key].length)
        )
        this.setState({
            eventLists: eventLists,
            counts: counts,
            loading: false,
        })
    }
    render() {
        const { selected, eventLists, counts, loading } = this.state
        if (!selected) return null

        return (
            <Row>
                <Sidebar
                    onSelect={this.onSelect}
                    selected={selected}
                    orgUnits={this.state.orgUnits}
                    menuItems={menuItems}
                    counts={counts}
                />
                <Main
                    selected={selected.id}
                    eventLists={eventLists}
                    loading={loading}
                />
            </Row>
        )
    }
}
