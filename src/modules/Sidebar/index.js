import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { OrgUnitTree } from './OrgUnitTree'
import { SidebarMenu } from './SidebarMenu'

/**
 * Sidebar with menu and possibly OU tree.
 */
export class Sidebar extends Component {
    render() {
        return (
            <div id="sidebar" style={{ margin: 16 }}>
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
                <Route
                    path="/events"
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
