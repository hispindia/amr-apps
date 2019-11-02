import React from 'react'
import { App, store, reducers } from '@hisp-amr/app'
import { Content } from './Content'

const appName = 'RC - Isolate Transfer (TEST)'

const isolateTransferStore = store({
    alert: reducers.alert,
    metadata: reducers.metadata,
    selectedOrgUnit: reducers.selectedOrgUnit,
})

export const IsolateTransfer = () => (
    <App appName={appName} store={isolateTransferStore}>
        <Content />
    </App>
)
