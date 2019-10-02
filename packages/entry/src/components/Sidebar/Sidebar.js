import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import { OrgUnits } from './OrgUnits'
import { SidebarMenu } from './SidebarMenu'

const Aside = styled.aside`
    background-color: #fff;
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    min-height: calc(100vh - 48px);
`

const SidebarContent = ({ location }) => (
    <Aside>
        <SidebarMenu location={location} />
        <OrgUnits />
    </Aside>
)

/**
 * Sidebar with menu and OU tree.
 */
export const Sidebar = () => <Route path="/events" component={SidebarContent} />
