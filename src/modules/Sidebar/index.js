import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { Margin, Col } from 'helpers'
import { OrgUnitTree } from './OrgUnitTree'
import SidebarMenu from './SidebarMenu'

/**
 * Sidebar with menu and possibly OU tree.
 */
export const Sidebar = props => (
    <Col>
        <Margin>
            <SidebarMenu
                selected={props.selected}
                items={props.menuItems.items}
                userOnly={props.menuItems.userOnly}
                counts={props.counts}
            />
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
        </Margin>
    </Col>
)

Sidebar.propTypes = {
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    orgUnits: PropTypes.arrayOf(PropTypes.object).isRequired,
    menuItems: PropTypes.shape({
        items: PropTypes.arrayOf(PropTypes.object).isRequired,
        userOnly: PropTypes.bool,
    }).isRequired,
}
