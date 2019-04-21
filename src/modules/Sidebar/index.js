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
                <SidebarMenu selected={props.selected.id} />
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
                        />
                    )}
                />
            </MarginBottom>
        </Margin>
    </Col>
)

Sidebar.propTypes = {
    onSelect: func.isRequired,
    selected: shape({
        id: string.isRequired,
        path: string.isRequired,
    }).isRequired,
}
