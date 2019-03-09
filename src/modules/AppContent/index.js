import React from 'react'
import { Sidebar } from '../'
import { Row, getOrgUnits } from '../../'

export class AppContent extends React.Component {
    state = {
        orgUnits: null,
        selected: null,
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
        })
    }

    onSelect = selected => this.setState({ selected: selected })

    render() {
        const { selected, orgUnits } = this.state
        const { menuItems, children } = this.props

        if (!selected) return null

        return (
            <Row>
                <Sidebar
                    onSelect={this.onSelect}
                    selected={selected}
                    orgUnits={orgUnits}
                    menuItems={menuItems}
                />
                {React.cloneElement(children, { selected: selected.id })}
            </Row>
        )
    }
}
