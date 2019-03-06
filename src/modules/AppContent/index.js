import React from 'react'
import { Sidebar } from '../'
import { Row, getOrgUnits, getEvents } from '../../'

export class AppContent extends React.Component {
    state = {
        orgUnits: null,
        selected: null,
        loading: true,
    }

    componentDidMount = async () => {
        const orgUnits = await getOrgUnits()
        const selected = {
            id: orgUnits[0].id,
            name: orgUnits[0].displayName,
        }
        this.setState({
            orgUnits: orgUnits,
            selected: selected,
            loading: true,
        })
        await this.setEvents(selected)
    }

    setEvents = async selected => {
        const eventLists = await getEvents(selected.id, this.props.userOnly)
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

    onSelect = async selected => {
        this.setState({ selected: selected })
        await this.setEvents(selected)
    }

    render() {
        const { selected, eventLists, counts, orgUnits, loading } = this.state
        const { menuItems, children } = this.props

        if (!selected) return null

        return (
            <Row>
                <Sidebar
                    onSelect={this.onSelect}
                    selected={selected}
                    orgUnits={orgUnits}
                    menuItems={menuItems}
                    counts={counts}
                />
                {React.cloneElement(children, {
                    selected: selected.id,
                    eventLists: eventLists,
                    loading: loading,
                })}
            </Row>
        )
    }
}
