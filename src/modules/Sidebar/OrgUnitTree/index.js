import React from 'react'
import { OrgUnitNode } from './OrgUnitNode'
import './style.css'
import { Card } from '@dhis2/ui/core'

export class OrgUnitTree extends React.Component {
    render() {
        return (
            <div id="org_unit_tree_spacing">
                <Card>
                    <div id="org_unit_tree_container">
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
                    </div>
                </Card>
            </div>
        )
    }
}
