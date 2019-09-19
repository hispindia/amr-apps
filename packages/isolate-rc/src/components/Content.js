import React from 'react'
import { useDispatch } from 'react-redux'
import { MetadataLoader } from '@hisp-amr/app'
import { Sidebar } from './Sidebar'
import { SidebarMenu } from './SidebarMenu'
import { OrgUnits } from './OrgUnits'
import { Main } from './Main'
import { setMetadata } from '../actions'

export const Content = () => {
    const dispatch = useDispatch()

    const action = () => dispatch(setMetadata())

    return (
        <MetadataLoader action={action}>
            <Sidebar>
                <SidebarMenu />
                <OrgUnits />
            </Sidebar>
            <Main />
        </MetadataLoader>
    )
}
