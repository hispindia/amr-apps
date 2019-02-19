import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { OrgUnitTree } from './OrgUnitTree'
import SidebarMenu from './SidebarMenu'
import { Margin } from '../../helpers/helpers'

/**
 * Sidebar with menu and possibly OU tree.
 */
export class Sidebar extends Component {
    render() {
        return (
            <Margin>
                <SidebarMenu selected={this.props.selected} />
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
            </Margin>
        )
    }
}
