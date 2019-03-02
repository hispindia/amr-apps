import React from 'react'
import { Route } from 'react-router-dom'
import { OrgUnitTree } from './OrgUnitTree'
import SidebarMenu from './SidebarMenu'
import { Margin, Col } from '../../helpers/helpers'

/**
 * Sidebar with menu and possibly OU tree.
 */
export const Sidebar = props => (
    <Col>
        <Margin>
            <SidebarMenu
                selected={props.selected}
                menuItems={props.menuItems}
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
