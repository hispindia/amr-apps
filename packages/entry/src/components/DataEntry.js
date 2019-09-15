import React from 'react'
import { string } from 'prop-types'
import { App, MetadataLoader } from '@amr/app'
import { appName } from '../config'
import { Content } from './Content'
import { entryStore } from '../store'

export const DataEntry = ({ baseUrl }) => (
    <App baseUrl={baseUrl} appName={appName} store={entryStore}>
        <MetadataLoader>
            <Content />
        </MetadataLoader>
    </App>
)

App.propTypes = { baseUrl: string.isRequired }
