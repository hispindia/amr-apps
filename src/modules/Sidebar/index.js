import React from 'react'
import { Route } from 'react-router-dom'
import { Col, Margin, MarginBottom } from 'styles'
import { OrgUnitTree } from './OrgUnitTree'
import SidebarMenu from './SidebarMenu'

/**
 * Sidebar with menu and possibly OU tree.
 */
export const Sidebar = () => (
    <Col>
        <Margin>
            <MarginBottom margin={12}>
                <SidebarMenu />
            </MarginBottom>
            <MarginBottom margin={12}>
                <Route
                    exact
                    path="/"
                    render={compProps => <OrgUnitTree {...compProps} />}
                />
                <Route
                    path="/approval"
                    render={compProps => <OrgUnitTree {...compProps} />}
                />
            </MarginBottom>
        </Margin>
    </Col>
)
