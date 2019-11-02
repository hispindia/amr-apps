import React from 'react'
import { App, MetadataLoader } from '@hisp-amr/app'
import { appName } from '../config'
import { Content } from './Content'
import { entryStore } from '../store'

export const DataEntry = () => (
    <App appName={appName} store={entryStore}>
        <MetadataLoader>
            <Content />
        </MetadataLoader>
    </App>
)
