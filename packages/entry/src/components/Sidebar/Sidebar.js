import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { OrgUnitTree } from './OrgUnitTree'
import SidebarMenu from './SidebarMenu'

const SidebarContainer = styled.aside`
    display: flex;
    flex-direction: column;
    padding: 16px;
`

const SidebarContent = () => (
    <SidebarContainer>
        <SidebarMenu />
        <OrgUnitTree />
    </SidebarContainer>
)

/**
 * Sidebar with menu and OU tree.
 */
export const Sidebar = () => <Route path="/events" component={SidebarContent} />
