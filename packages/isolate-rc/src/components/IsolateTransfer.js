import React from 'react'
import { App, Row, store, reducers } from '@hisp-amr/app'
import { Content } from './Content'
import 'typeface-roboto'

const appName = 'RC - Isolate Transfer'

const isolateTransferStore = store({
    alert: reducers.alert,
    metadata: reducers.metadata,
    selectedOrgUnit: reducers.selectedOrgUnit,
})

export const IsolateTransfer = () => (
    <App appName={appName} store={isolateTransferStore}>
        <Row>
            <Content />
        </Row>
    </App>
)
