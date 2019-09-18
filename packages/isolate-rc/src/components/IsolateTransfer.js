import React from 'react'
import { App, Row, store, reducers } from '@hisp-amr/app'
import { Sidebar } from './Sidebar'
import { SidebarMenu } from './SidebarMenu'
import { OrgUnits } from './OrgUnits'
import { Main } from './Main'
import 'typeface-roboto'

const appName = 'RC - Isolate Transfer'

const isolateTransferStore = store({
    alert: reducers.alert,
    selectedOrgUnit: reducers.selectedOrgUnit,
})

export const IsolateTransfer = () => (
    <App appName={appName} store={isolateTransferStore}>
        <Row>
            <Sidebar>
                <SidebarMenu />
                <OrgUnits />
            </Sidebar>
            <Main />
        </Row>
    </App>
)
