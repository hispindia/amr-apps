import React from 'react'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { MarginBottom } from 'styles'
import { OrgUnitTree } from './OrgUnitTree'
import SidebarMenu from './SidebarMenu'

const SidebarContainer = styled.aside`
    display: flex;
    flex-direction: column;
    padding: 16px;
`

/**
 * Sidebar with menu and possibly OU tree.
 */
export const Sidebar = () => (
    <SidebarContainer>
        <SidebarMenu />
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
    </SidebarContainer>
)
