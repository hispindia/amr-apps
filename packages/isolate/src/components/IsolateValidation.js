import React from 'react'
import { string } from 'prop-types'
import { App, MetadataLoader, store, reducers } from '@amr/app'
import { appName } from '../config'
import { Main } from './Main'

const appReducers = {
    alert: reducers.alert,
    metadata: reducers.metadata,
    data: reducers.data,
}

const appStore = store(appReducers)

export const IsolateValidation = ({ baseUrl }) => (
    <App baseUrl={baseUrl} appName={appName} store={appStore}>
        <MetadataLoader>
            <Main />
        </MetadataLoader>
    </App>
)

App.propTypes = { baseUrl: string.isRequired }
