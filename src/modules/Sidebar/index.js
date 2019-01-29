import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { OrgUnitTree } from './OrgUnitTree'
import { SidebarMenu } from './SidebarMenu'

export class Sidebar extends Component {
    render() {
        return (
            <div style={{ margin: 16 }}>
                <SidebarMenu />
                <Route
                    exact
                    path="/"
                    render={props => (
                        <OrgUnitTree
                            {...props}
                            onSelect={this.props.onSelect}
                            selected={this.props.selected}
                            orgUnits={this.props.orgUnits}
                        />
                    )}
                />
            </div>
        )
    }
}
