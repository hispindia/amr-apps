import React from 'react'
import { OrgUnitNode } from './OrgUnitNode'
import './style.css'

export class OrgUnitTree extends React.Component {
    render() {
        return (
            <ul id="org_unit_tree">
                {this.props.orgUnits.map(orgUnit => (
                    <OrgUnitNode
                        orgUnit={orgUnit}
                        key={orgUnit.id}
                        show={true}
                        onSelect={this.props.onSelect}
                        selected={this.props.selected}
                    />
                ))}
            </ul>
        )
    }
}
