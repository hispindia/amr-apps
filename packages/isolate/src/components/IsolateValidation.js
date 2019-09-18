import React from 'react'
import { App, MetadataLoader } from '@hisp-amr/app'
import { isolateStore } from '../store'
import { appName } from '../config'
import { Main } from './Main'

export const IsolateValidation = () => (
    <App appName={appName} store={isolateStore}>
        <MetadataLoader isIsolate>
            <Main />
        </MetadataLoader>
    </App>
)
