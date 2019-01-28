import React from 'react'
import { OrgUnitTree } from './OrgUnitTree'

export class Sidebar extends React.Component {
    render() {
        return (
            <div style={{ margin: 16 }}>
                <OrgUnitTree
                    onSelect={this.props.onSelect}
                    selected={this.props.selected}
                    orgUnits={this.props.orgUnits}
                />
            </div>
        )
    }
}
