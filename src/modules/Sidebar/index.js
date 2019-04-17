import React from 'react'
import { arrayOf, bool, func, object, shape, string } from 'prop-types'
import { Route } from 'react-router-dom'
import { Col, Margin, MarginBottom } from 'styles'
import { OrgUnitTree } from './OrgUnitTree'
import SidebarMenu from './SidebarMenu'

/**
 * Sidebar with menu and possibly OU tree.
 */
export const Sidebar = props => (
    <Col>
        <Margin>
            <MarginBottom margin={12}>
                <SidebarMenu
                    selected={props.selected.id}
                    items={props.menuItems.items}
                    userOnly={props.menuItems.userOnly}
                    counts={props.counts}
                />
            </MarginBottom>
            <MarginBottom margin={12}>
                <Route
                    exact
                    path="/"
                    render={compProps => (
                        <OrgUnitTree
                            {...compProps}
                            onSelect={props.onSelect}
                            selected={props.selected}
                            orgUnits={props.orgUnits}
                        />
                    )}
                />
                <Route
                    path="/approval"
                    render={compProps => (
                        <OrgUnitTree
                            {...compProps}
                            onSelect={props.onSelect}
                            selected={props.selected}
                            orgUnits={props.orgUnits}
                        />
                    )}
                />
            </MarginBottom>
        </Margin>
    </Col>
)

Sidebar.propTypes = {
    onSelect: func.isRequired,
    orgUnits: arrayOf(object).isRequired,
    selected: shape({
        id: string.isRequired,
        path: string.isRequired,
    }).isRequired,
    menuItems: shape({
        items: arrayOf(object).isRequired,
        userOnly: bool,
    }).isRequired,
}
