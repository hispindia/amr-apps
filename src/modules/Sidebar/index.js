import React from 'react'
import PropTypes from 'prop-types'
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
    onSelect: PropTypes.func.isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
    selected: PropTypes.shape({
        id: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
    }).isRequired,
    menuItems: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        userOnly: PropTypes.bool,
    }).isRequired,
}
